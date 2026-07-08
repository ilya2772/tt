const HERMES_BASE_URL = "https://hermes.pyth.network";

export function buildHermesStreamUrl(feedIds: string[]) {
  const url = new URL("/v2/updates/price/stream", HERMES_BASE_URL);
  feedIds.forEach((id) => url.searchParams.append("ids[]", id));
  url.searchParams.set("parsed", "true");
  url.searchParams.set("encoding", "hex");
  return url.toString();
}
