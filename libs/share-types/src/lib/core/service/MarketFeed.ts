import {Pairs} from "../../common/Pairs";
import {ExchangeHouses} from "../../common/ExchangeHouses";

export type MarketFeed = Market | PriceDiff | Trade

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
