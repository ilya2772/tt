import type { Asset } from "../types/pyth";

export const ASSETS: Asset[] = [
  {
    ticker: "BTC/USDT",
    pythSymbol: "Crypto.BTC/USD",
    feedId: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  },
  {
    ticker: "ETH/USDT",
    pythSymbol: "Crypto.ETH/USD",
    feedId: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  },
  {
    ticker: "SOL/USDT",
    pythSymbol: "Crypto.SOL/USD",
    feedId: "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  },
];
