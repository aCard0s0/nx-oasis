export type BinanceAPI = BinanceCandlestick

export interface BinanceCandlestick {
  OpenTime: number,
  OpenPrice: string,
  HighPrice: string,
  LowPrice: string,
  ClosePrice: string,
  Volume: string,
  CloseTime: number,
  //Quote asset volume
  NumberOfTrades: number
  //Taker buy base asset volume
  //Taker buy quote asset volume
  //Unused field, ignore.
}
