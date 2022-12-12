import {KrakenTradeObj} from "./KrakenTrade";

export type KrakenMessages = KrakenHeartbeat | KrakenSystemStatus | krakenSubscription | KrakenTradeObj

export interface KrakenHeartbeat {
  event: 'heartbeat'
}

export interface KrakenSystemStatus {
  connectionID: number,
  event: 'systemStatus',
  status: string,
  version: string
}

export interface krakenSubscription {
  channelID: number,              // deprecated
  event: "subscriptionStatus",
  channelName: string,
  pair: string,
  status: string,
  subscription: {
    "name": string
  }
}

export interface KrakenTrade {
  channelID: number,    // Channel ID of subscription - deprecated, use channelName and pair
  array: TradeDetails[],
  event: string,        // Channel Name of subscription (rename as event)
  pair: string          // Asset pair
}

export interface TradeDetails {
  price: number,
  volume: number,
  time: number,
  side: string,
  orderType: string,
  misc: string
}

/*
export interface KrakenTicker {
  channelID: number,           // Channel ID of subscription - deprecated, use channelName and pair
  anonymous: {
    a: Bundle[],              // Ask
    b: Bundle[],              // Bid
    c: {                      // Close
      price: number,          // Price
      wholeLotVolume: number, // Lot volume
    }
    v: PriceVolume[]          // Volume
    p: PriceVolume[]          // Volume weighted average price
    t: PriceVolume[]          // Number of trades
    l: PriceVolume[]          // Low price
    h: PriceVolume[]          // High price
    o: PriceVolume[]          // Open Price
  },
  channelName: string,        // Channel Name of subscription
  pair: string                // Asset pair
}

interface Bundle {
  price: number,          // Best ask price
  wholeLotVolume: number, // Whole lot volume
  lotVolume: number       // Lot volume
}

interface PriceVolume {
  today: number,          // Price
  last24Hours: number     // Lot volume
}

export interface KrakenOHLC {
  channelID: number,    // Channel ID of subscription - deprecated, use channelName and pair
  array: OHLC[],
  channelName: string,  // Channel Name of subscription
  pair: string          // Asset pair
}

interface OHLC {
  time: number,       // Candle last update time, in seconds since epoch
  etime: number,      // End time of interval, in seconds since epoch
  open: number,       // Open price of interval
  high: number,       // High price within interval
  low: number,        // Low price within interval
  close: number,      // Close price of interval
  vwap: number,       // Volume weighted average price within interval
  volume: number,     // Accumulated volume within interval
  count: number       // Number of trades within interval
}
*/
