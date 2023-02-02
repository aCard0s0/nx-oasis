export type BinanceRequest = BinanceSubscribeRequest | BinanceUnsubscribeRequest

export interface BinanceSubscribeRequest {
  method: "SUBSCRIBE",
  params: string[],
  id: number
}

export interface BinanceUnsubscribeRequest {
  method: "UNSUBSCRIBE",
  params: string[],
  id: number
}

export const BinanceSubRequest: BinanceSubscribeRequest = {
  method: "SUBSCRIBE",
  params: [
    "etheur@aggTrade",
    "etheur@miniTicker",
    "btceur@aggTrade",
    "adaeur@aggTrade"
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

export const BinanceAllMarketsSubRequest: BinanceSubscribeRequest = {
  method: "SUBSCRIBE",
  params: [
    '!miniTicker@arr'
  ],
  id: 1
}
