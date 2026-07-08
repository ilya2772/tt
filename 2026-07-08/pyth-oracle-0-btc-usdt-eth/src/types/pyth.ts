export type StreamStatus = "idle" | "connecting" | "open" | "error";

export type Asset = {
  ticker: "BTC/USDT" | "ETH/USDT" | "SOL/USDT";
  pythSymbol: string;
  feedId: string;
};

export type RpcPrice = {
  price: string;
  conf: string;
  expo: number;
  publish_time: number;
};

export type ParsedPriceUpdate = {
  id: string;
  price: RpcPrice;
  ema_price: RpcPrice;
  metadata?: {
    slot?: number;
    proof_available_time?: number;
    prev_publish_time?: number;
  };
};

export type HermesPriceUpdate = {
  binary: {
    encoding: "hex" | "base64";
    data: string[];
  };
  parsed?: ParsedPriceUpdate[];
};

export type PriceById = Record<string, ParsedPriceUpdate>;

export type PricePoint = {
  time: number;
  value: number;
};

export type PriceHistoryById = Record<string, PricePoint[]>;
