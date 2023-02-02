
export interface BinancePair {
  symbol: string,
  status: string,
  baseAsset: string,
  baseAssetPrecision: number,
  quoteAsset: string,
  quotePrecision: number,
  quoteAssetPrecision: number,
  orderTypes: [
    "LIMIT"?,
    "LIMIT_MAKER"?,
    "MARKET"?,
    "STOP_LOSS"?,
    "STOP_LOSS_LIMIT"?,
    "TAKE_PROFIT"?,
    "TAKE_PROFIT_LIMIT"?
  ],
  icebergAllowed: boolean,
  ocoAllowed: boolean,
  quoteOrderQtyMarketAllowed: boolean,
  allowTrailingStop: boolean,
  cancelReplaceAllowed: boolean,
  isSpotTradingAllowed: boolean,
  isMarginTradingAllowed: boolean,
  filters: [],
  permissions: [
    "SPOT"?,
    "MARGIN"?
  ],
  defaultSelfTradePreventionMode: string,
  allowedSelfTradePreventionModes: string[]
}
