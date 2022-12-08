import {
  BinanceSubscribeRequest,
  BinanceUnsubscribeRequest, CoinbaseSubscribeRequest, CoinbaseUnsubscribeRequest,
  KrakenSubscribeRequest,
  KrakenUnsubscribeRequest
} from "@oasis/share-types";

export const BinanceSubRequest: BinanceSubscribeRequest = {
  method: "SUBSCRIBE",
  params: [
    "etheur@aggTrade",
    "btceur@aggTrade",
    "adaeur@aggTrade",
  ],
  id: 1
}

export const BinanceUnsubRequest: BinanceUnsubscribeRequest = {
  method: "UNSUBSCRIBE",
  params: [
    "etheur@aggTrade",
  ],
  id: 1
}

export const KrakenSubTradeRequest: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
    "XBT/EUR",
    "ADA/EUR",
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

export const CoinbaseSubTickerRequest: CoinbaseSubscribeRequest = {
  type: "subscribe",
  product_ids: [
    "ETH-EUR"
  ],
  channels: [
    {
      "name": "ticker",
      "product_ids": [
        "BTC-EUR",
        "ETH-EUR",
        "ADA-EUR",
      ]
    }
  ]
}

export const CoinbaseSubHeartbeatRequest: CoinbaseSubscribeRequest = {
  type: 'subscribe',
  product_ids: [
    'ETH-EUR'
  ],
  channels: [
    'heartbeat'
  ]
}

export const CoinbaseUnsubRequest: CoinbaseUnsubscribeRequest = {
  type: "subscribe",
  channels: [
    "heartbeat",
  ]
}
