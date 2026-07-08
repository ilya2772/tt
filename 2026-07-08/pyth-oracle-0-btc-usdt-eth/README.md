# Pyth Prop Terminal

Stage 0 foundation for a web prop-trading terminal powered by Pyth Oracle real-time prices.

## Stack

- React
- TypeScript
- Tailwind CSS
- lightweight-charts
- Pyth Hermes SSE stream for real-time price updates

## Assets

Pyth Core currently exposes these markets as USD feeds. The terminal labels them as USDT trading pairs while sourcing the corresponding Pyth USD oracle prices.

| Terminal ticker | Pyth symbol | Pyth price feed ID |
| --- | --- | --- |
| BTC/USDT | Crypto.BTC/USD | `e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43` |
| ETH/USDT | Crypto.ETH/USD | `ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace` |
| SOL/USDT | Crypto.SOL/USD | `ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d` |

## Hermes SSE

The stream endpoint is:

```text
https://hermes.pyth.network/v2/updates/price/stream?ids[]=<feed-id>&parsed=true
```

The app builds this URL in `src/lib/hermes.ts`.
# tt
