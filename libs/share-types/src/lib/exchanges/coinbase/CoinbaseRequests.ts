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

export const CoinbaseSubTickerRequest: CoinbaseSubscribeRequest = {
  type: "subscribe",
  product_ids: [
    'BTC-EUR',
    'BTC-EUR',
    'ADA-EUR',
  ],
  channels: [           // may have objects or strings
    {
      name: "ticker",
      product_ids: [
        'BTC-EUR',
        'BTC-EUR',
        'ADA-EUR',
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
  type: 'subscribe',
  channels: [
    'heartbeat',
  ]
}
