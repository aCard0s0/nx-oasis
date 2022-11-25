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
