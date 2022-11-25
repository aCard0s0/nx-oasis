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
    "btcusdt@aggTrade",
  ],
  id: 1
}

export const KrakenSubRequestTrade: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
  ],
  subscription: {
    name: "trade"
  }
}

export const KrakenSubRequestTicker: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
  ],
  subscription: {
    name: "ticker"
  }
}

export const KrakenSubRequestOHCL: KrakenSubscribeRequest = {
  event: "subscribe",
  pair: [
    "ETH/EUR",
  ],
  subscription: {
    name: "ohlc"
  }
}

export const KrakenUnsubRequest: KrakenUnsubscribeRequest = {
  event: "unsubscribe",
  pair: [
    "BTC/EUR",
  ],
  subscription: {
    name: "trade"
  }
}
