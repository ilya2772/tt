import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  LineSeries,
  type UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Asset, ParsedPriceUpdate, PricePoint } from "../types/pyth";
import { formatOraclePrice } from "../lib/format";

type PriceChartProps = {
  asset: Asset;
  price?: ParsedPriceUpdate;
  history: PricePoint[];
};

const timeframes = ["1m", "5m", "1h", "1d"] as const;

export function PriceChart({ asset, price, history }: PriceChartProps) {
  const [timeframe, setTimeframe] = useState<(typeof timeframes)[number]>("1m");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const formattedTicker = asset.ticker.replace("/", " / ");
  const changePercent = useMemo(() => {
    if (history.length < 2) return null;

    const firstPoint = history[0];
    const lastPoint = history[history.length - 1];
    if (!lastPoint || firstPoint.value === 0) return null;

    return ((lastPoint.value - firstPoint.value) / firstPoint.value) * 100;
  }, [history]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { color: "#0b0f14" },
        textColor: "#787b86",
      },
      grid: {
        horzLines: { color: "#1f2933" },
        vertLines: { color: "#151a21" },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: "#363a45", labelBackgroundColor: "#2962ff" },
        horzLine: { color: "#363a45", labelBackgroundColor: "#2962ff" },
      },
      rightPriceScale: {
        borderColor: "#2a2e39",
        scaleMargins: {
          top: 0.12,
          bottom: 0.12,
        },
      },
      timeScale: {
        borderColor: "#2a2e39",
        timeVisible: true,
        secondsVisible: true,
        rightOffset: 8,
        barSpacing: 8,
      },
    });

    chartRef.current = chart;
    seriesRef.current = chart.addSeries(LineSeries, {
      color: "#2962ff",
      crosshairMarkerBorderColor: "#2962ff",
      crosshairMarkerBackgroundColor: "#0b0f14",
      lineWidth: 2,
      priceLineColor: "#2962ff",
      priceLineWidth: 1,
      title: asset.ticker,
    });

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;

    series.applyOptions({ title: asset.ticker });
    series.setData(
      history.map((point) => ({
        time: point.time as UTCTimestamp,
        value: point.value,
      })),
    );
    chartRef.current?.timeScale().fitContent();
  }, [asset.feedId, asset.ticker, history]);

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-[#0b0f14]">
      <div className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-[#2a2e39] bg-[#111318] px-4 py-3">
        <div className="flex min-w-0 items-baseline gap-4">
          <h2 className="font-mono text-2xl font-semibold text-white">{formattedTicker}</h2>
          <span className="font-mono text-xl text-[#d1d4dc]">
            {price ? formatOraclePrice(price.price) : "..."}
          </span>
          <span
            className={`font-mono text-sm ${
              changePercent === null
                ? "text-zinc-500"
                : changePercent >= 0
                  ? "text-[#26a69a]"
                  : "text-[#ef5350]"
            }`}
          >
            {changePercent === null ? "0.00%" : `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded border border-[#2a2e39] bg-[#0b0f14] p-1">
          {timeframes.map((item) => (
            <button
              key={item}
              className={`h-8 min-w-10 rounded-sm px-3 font-mono text-xs transition ${
                timeframe === item
                  ? "bg-[#2962ff] text-white"
                  : "text-[#b2b5be] hover:bg-[#1c2030] hover:text-white"
              }`}
              type="button"
              onClick={() => setTimeframe(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="min-h-0 flex-1" />
    </section>
  );
}
