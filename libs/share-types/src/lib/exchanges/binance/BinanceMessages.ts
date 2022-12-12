export type BinanceMessages = AggregateTrade | BinanceTrade | MiniTicker | BinanceTicker

export interface AggregateTrade {
  e: string,    // Event type
  E: number,    // Event time
  s: string,    // Symbol
  a: number,    // Aggregate trade ID
  p: string,    // Price
  q: string,    // Quantity
  f: number,    // First trade ID
  l: number,    // Last trade ID
  T: number,    // Trade time
  m: boolean,   // Is the buyer the market maker?
  M: boolean    // Ignore
}

export interface BinanceTrade {
  e: string,    // Event type
  E: number,    // Event time
  s: string,    // Symbol
  t: number,    // Trade ID
  p: string,    // Price
  q: string,    // Quantity
  b: number,    // Buyer order ID
  a: number,    // Seller order ID
  T: number,    // Trade time
  m: boolean,   // Is the buyer the market maker?
  M: boolean    // Ignore
}

export interface MiniTicker {
  e: string,    // Event type
  E: number,    // Event time
  s: string,    // Symbol
  c: string,    // Close price
  o: string,    // Open price
  h: string,    // High price
  l: string     // Low price
  v: string,    // Total traded base asset volume
  q: string     // Total traded quote asset volume
}

export interface BinanceTicker {
  e: string,    // Event type
  E: number,    // Event time
  s: string,    // Symbol
  p: string,    // Price change
  P: string,    // Price change percent
  w: string,    // Weighted average price
  x: string,    // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: string,    // Last price
  Q: string,    // Last quantity
  b: string,    // Best bid price
  B: string,    // Best bid quantity
  a: string,    // Best ask price
  A: string,    // Best ask quantity
  o: string,    // Open price
  h: string,    // High price
  l: string,    // Low price
  v: string,    // Total traded base asset volume
  q: string,    // Total traded quote asset volume
  O: number,    // Statistics open time
  C: number,    // Statistics close time
  F: number,    // First trade ID
  L: number,    // Last trade Id
  n: number     // Total number of trades
}
