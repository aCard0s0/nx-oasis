export type KrakenRequest = KrakenSubscribeRequest | KrakenUnsubscribeRequest

export interface KrakenSubscribeRequest {
  event: "subscribe",
  reqid?: number,
  pair?: string[],
  subscription: {
    depth?: 10 | 25 | 100 | 500 | 1000
    interval?: 1 | 5 | 15 | 30 | 60 | 240 | 1440 | 10080 | 21600
    name: "book" | "ohlc" | "openOrders" | "ownTrades" | "spread" | "ticker" | "trade" | "*, *"
    ratecounter?: boolean
    snapshot?: boolean
    token?: string
    consolidate_taker?: boolean
  }
}

export interface KrakenUnsubscribeRequest {
  event: "unsubscribe",
  reqid?: number,
  pair?: string[],
  subscription: {
    depth?: number,
    interval?: number,
    name: string,
    token?: string
  }
}

export const KrakenSubTradeRequest: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
    "XBT/EUR",
    "ADA/EUR",
    "XRP/EUR",
  ],
  subscription: {
    name: "trade"
  }
}

export const KrakenSubTickerRequest: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
  ],
  subscription: {
    name: "ticker"
  }
}

export const KrakenSubOHCLRequest: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
  ],
  subscription: {
    name: "ohlc"
  }
}

export const KrakenUnsubTradeRequest: KrakenUnsubscribeRequest = {
  event: "unsubscribe",
  pair: [
    "BTC/EUR",
  ],
  subscription: {
    name: "trade"
  }
}
