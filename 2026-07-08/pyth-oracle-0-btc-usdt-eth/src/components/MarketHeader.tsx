import type { StreamStatus } from "../types/pyth";

type MarketHeaderProps = {
  status: StreamStatus;
  error: string | null;
};

export function MarketHeader({ status, error }: MarketHeaderProps) {
  const statusTone =
    status === "open"
      ? "bg-emerald-500"
      : status === "connecting"
        ? "bg-amber-400"
        : "bg-zinc-500";

  return (
    <header className="flex min-h-[48px] flex-col gap-3 border-b border-[#2a2e39] bg-[#0f1117] px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-sm font-semibold tracking-normal text-white">Pyth Prop Terminal</h1>
        <p className="mt-0.5 text-xs text-zinc-500">Hermes SSE Oracle Feed</p>
      </div>
      <div className="flex items-center gap-3 rounded-sm border border-[#2a2e39] bg-[#111318] px-3 py-1.5 text-xs">
        <span className={`h-2.5 w-2.5 rounded-full ${statusTone}`} />
        <span className="font-mono uppercase text-zinc-300">{status}</span>
        {error ? <span className="text-red-300">{error}</span> : null}
      </div>
    </header>
  );
}
