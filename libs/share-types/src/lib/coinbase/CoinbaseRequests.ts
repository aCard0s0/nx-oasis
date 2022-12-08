export type CoinbaseRequest = CoinbaseSubscribeRequest | CoinbaseUnsubscribeRequest

export interface CoinbaseSubscribeRequest {
  type: string,
  product_ids: string[],
  channels: any[]
}

export interface CoinbaseUnsubscribeRequest {
  type: string,
  channels: any[]
}
