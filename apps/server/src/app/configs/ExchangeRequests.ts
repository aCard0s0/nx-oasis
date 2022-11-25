import {
  BinanceSubscribeRequest,
  BinanceUnsubscribeRequest,
  KrakenSubscribeRequest,
  KrakenUnsubscribeRequest
} from "@oasis/share-types";

export const BinanceSubRequest: BinanceSubscribeRequest = {
  method: "SUBSCRIBE",
  params: [
    "etheur@aggTrade",
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
