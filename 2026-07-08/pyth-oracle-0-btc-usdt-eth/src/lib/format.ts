import type { RpcPrice } from "../types/pyth";

export function toOracleNumber(price: RpcPrice) {
  return Number(price.price) * 10 ** price.expo;
}

export function formatOraclePrice(price: RpcPrice) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: price.expo <= -4 ? 4 : 2,
  }).format(toOracleNumber(price));
}

export function formatPublishTime(publishTime: number) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(publishTime * 1000));
}
