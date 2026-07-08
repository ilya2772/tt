import { useMemo, useState } from "react";
import { AssetList } from "./components/AssetList";
import { MarketHeader } from "./components/MarketHeader";
import { PriceChart } from "./components/PriceChart";
import { usePythPriceStream } from "./hooks/usePythPriceStream";
import { ASSETS } from "./lib/assets";

export function App() {
  const [selectedFeedId, setSelectedFeedId] = useState(ASSETS[0].feedId);
  const { prices, history, status, error } = usePythPriceStream(ASSETS);
  const selectedAsset = useMemo(
    () => ASSETS.find((asset) => asset.feedId === selectedFeedId) ?? ASSETS[0],
    [selectedFeedId],
  );

  return (
    <main className="h-screen overflow-hidden bg-[#0b0f14] text-zinc-100">
      <div className="flex h-full w-full flex-col">
        <MarketHeader status={status} error={error} />
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          <AssetList
            assets={ASSETS}
            prices={prices}
            selectedFeedId={selectedFeedId}
            onSelect={setSelectedFeedId}
          />
          <PriceChart
            asset={selectedAsset}
            price={prices[selectedAsset.feedId]}
            history={history[selectedAsset.feedId] ?? []}
          />
        </div>
      </div>
    </main>
  );
}
