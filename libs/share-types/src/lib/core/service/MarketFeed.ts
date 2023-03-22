import {Pairs} from "../../common/Pairs";
import {ExchangeHouses} from "../../common/ExchangeHouses";
import {BinanceMiniTicker} from "../../exchanges/binance/BinanceMessages";

export type MarketFeed = Market | PriceDiff | Trade | BinanceAllMarketUpdate

export interface Market {
  event: 'market'
  pair: Pairs,
  exchanges: Exchange[]
}

interface Exchange {
  name: string
  lastPrice: Price
}

export interface PriceDiff {
  event: 'priceDiff',
  pair: Pairs,
  priceDiffDetails: PriceDiffDetails[]
}

interface PriceDiffDetails {
  from: ExchangeHouses,
  to: ExchangeHouses,
  priceDiff: Price
}

export interface Trade {
  event: 'trade',
  market: Pairs,
  exchange: ExchangeHouses
  lastPrice: Price
}

interface Price {
  amount: number,
  currency: string
}

export interface BinanceAllMarketUpdate {
  event: 'binanceAllMarketUpdate'
  content: BinanceMiniTicker[]
}
