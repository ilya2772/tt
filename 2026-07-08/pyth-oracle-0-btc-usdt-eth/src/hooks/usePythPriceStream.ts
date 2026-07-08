import { useEffect, useMemo, useState } from "react";
import { toOracleNumber } from "../lib/format";
import { buildHermesStreamUrl } from "../lib/hermes";
import type { Asset, HermesPriceUpdate, PriceHistoryById, PricePoint, PriceById, StreamStatus } from "../types/pyth";

const MAX_HISTORY_POINTS = 1_500;

export function usePythPriceStream(assets: Asset[]) {
  const [prices, setPrices] = useState<PriceById>({});
  const [history, setHistory] = useState<PriceHistoryById>({});
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const feedIds = useMemo(() => assets.map((asset) => asset.feedId), [assets]);

  useEffect(() => {
    if (feedIds.length === 0) return;

    setStatus("connecting");
    setError(null);

    const source = new EventSource(buildHermesStreamUrl(feedIds));

    source.onopen = () => {
      setStatus("open");
      setError(null);
    };

    source.onmessage = (event) => {
      const payload = JSON.parse(event.data) as HermesPriceUpdate;
      if (!payload.parsed) return;

      setPrices((current) => {
        const next = { ...current };
        payload.parsed?.forEach((update) => {
          next[update.id] = update;
        });
        return next;
      });

      setHistory((current) => {
        const next = { ...current };

        payload.parsed?.forEach((update) => {
          const value = toOracleNumber(update.price);
          if (!Number.isFinite(value)) return;

          const point: PricePoint = {
            time: update.price.publish_time,
            value,
          };
          const points = next[update.id] ?? [];
          const lastPoint = points[points.length - 1];

          if (lastPoint?.time === point.time) {
            next[update.id] = [...points.slice(0, -1), point];
            return;
          }

          next[update.id] = [...points, point].slice(-MAX_HISTORY_POINTS);
        });

        return next;
      });
    };

    source.onerror = () => {
      setStatus("error");
      setError("stream reconnecting");
    };

    return () => {
      source.close();
      setStatus("idle");
    };
  }, [feedIds]);

  return { prices, history, status, error };
}
