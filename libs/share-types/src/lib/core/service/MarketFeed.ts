import {Pairs} from "../../common/Pairs";
import {ExchangeHouses} from "../../common/ExchangeHouses";

export type MarketFeed = Market | Trade

export interface Market {
  event: 'market'
  market: Pairs,
  exchanges: Exchange[]
}

interface Exchange {
  name: string
  lastPrice: Price
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
