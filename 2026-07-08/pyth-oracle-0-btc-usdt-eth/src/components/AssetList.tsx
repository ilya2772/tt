import type { Asset, PriceById } from "../types/pyth";
import { formatOraclePrice, formatPublishTime } from "../lib/format";

type AssetListProps = {
  assets: Asset[];
  prices: PriceById;
  selectedFeedId: string;
  onSelect: (feedId: string) => void;
};

export function AssetList({ assets, prices, selectedFeedId, onSelect }: AssetListProps) {
  return (
    <aside className="flex min-h-0 flex-col border-r border-zinc-800 bg-[#111318]">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase text-zinc-400">Markets</h2>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {assets.map((asset) => {
          const price = prices[asset.feedId];
          const isSelected = selectedFeedId === asset.feedId;

          return (
            <button
              key={asset.feedId}
              className={`block w-full border-b border-zinc-800 px-4 py-4 text-left transition ${
                isSelected
                  ? "bg-[#1d2533] shadow-[inset_3px_0_0_#2962ff]"
                  : "bg-transparent hover:bg-[#181b22]"
              }`}
              type="button"
              onClick={() => onSelect(asset.feedId)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className={`font-mono text-base ${isSelected ? "text-white" : "text-zinc-200"}`}>
                    {asset.ticker}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">{asset.pythSymbol}</p>
                </div>
                <div className="text-right">
                  <p className={`font-mono text-base ${isSelected ? "text-[#26a69a]" : "text-emerald-300"}`}>
                    {price ? formatOraclePrice(price.price) : "..."}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {price ? formatPublishTime(price.price.publish_time) : "waiting"}
                  </p>
                </div>
              </div>
              <p className="mt-3 break-all font-mono text-[11px] leading-5 text-zinc-500">{asset.feedId}</p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
