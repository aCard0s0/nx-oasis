import {ExchangeHouses, Market, MarketFeed, Pairs, PriceDiff} from "@oasis/share-types";
import {MarketService} from "./service/MarketService";
import logger from "../configs/Logger";

export class MarketStorage {
  private static instance: MarketStorage
  private prices = new Map<Pairs, Map<ExchangeHouses, number>>()
  private pairs = new Set<Pairs>()
  private marketService = MarketService.getInstance()

  public static getInstance(): MarketStorage {
    if(!MarketStorage.instance) {
      return MarketStorage.instance = new MarketStorage();
    }
    return MarketStorage.instance;
  }

  // Todo: decrease the number of call to this function
  addPrice(pair: Pairs, exchange: ExchangeHouses, price: number) {
    if (!this.prices.has(pair) && !this.pairs.has(pair)) {
      const map = new Map<ExchangeHouses, number>()
      map.set(exchange, price)
      this.prices.set(pair, map);
      this.pairs.add(pair)

    } else {
      this.prices.get(pair).set(exchange, price)
    }

    logger.debug(`[MarketStorage] operation=addPrice; pair=${pair}; exchange=${exchange}; price=${price}`)

    /*  No need forward the trade to FE ?
    this.marketService.publishTrade({
      event: 'trade',
      market: pair,
      exchange: exchange,
      lastPrice: {
        amount: price,
        currency: 'Eur'
      }
    })*/
  }

  sendMarketSnapshot() {
    let market: Market;
    this.prices.forEach((exchangeMap, pair) => {
      market = this.buildMarketEvent(pair)
      for (const exchange of exchangeMap.keys()) {
        market.exchanges.push(this.buildExchange(exchange, this.getPrice(pair, exchange)));
      }
      this.marketService.publishMarketSnapshot(market)
    })
  }

  buildMarketEvent(pair): Market {
    return  {
      event: 'market',
      pair: pair,
      exchanges: []
    };
  }

  buildExchange(exchange: ExchangeHouses, price: number) {
    return {
      name: exchange,
      lastPrice: {
        amount: price,
        currency: 'Eur'
      }
    }
  }

  getPrice(pair: Pairs, exchange: ExchangeHouses) : number {
    return this.prices.get(pair).get(exchange)
  }

  calculateDiff() {
    this.pairs.forEach( pair => {
      const priceDiff: PriceDiff = this.buildPriceDiff(pair)
      const houses = Array.from(this.prices.get(pair).keys());
      for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < houses.length; j++) {
          if (i !== j) {
            priceDiff.priceDiffDetails.push(
              this.addPriceDiff(
                houses[i], houses[j], this.getPrice(pair, houses[i]) - this.getPrice(pair, houses[j]), 'Eur'))
          }
        }
      }
      this.marketService.publishMarketPriceDifferent(priceDiff)
    })
  }

  buildPriceDiff(pair: Pairs): PriceDiff {
    return {
      event: 'priceDiff',
      pair: pair,
      priceDiffDetails: []
    }
  }

  addPriceDiff(from: ExchangeHouses, to: ExchangeHouses, price: number, currency: string) {
    return {
      from: from,
      to: to,
      priceDiff: {
        amount: price,
        currency: currency
      }
    }
  }
}
