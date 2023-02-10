import {ExchangeHouses, Market, Pairs, PriceDiff} from "@oasis/share-types";
import {MarketService} from "./MarketService";
import Logger from "../../configs/Logger";

export class MarketStorage {
  private static instance: MarketStorage
  private priceStorage = new Map<Pairs, Map<ExchangeHouses, number>>()
  private marketService = MarketService.getInstance()

  public static getInstance(): MarketStorage {
    if(!MarketStorage.instance) {
      return MarketStorage.instance = new MarketStorage();
    }
    return MarketStorage.instance;
  }

  // Todo: decrease the number of call to this function
  addPrice(pair: Pairs, exchange: ExchangeHouses, price: number) {
    if (this.priceStorage.has(pair)) {
      this.priceStorage.get(pair).set(exchange, price)

    } else {
      const map = new Map<ExchangeHouses, number>()
      map.set(exchange, price)
      this.priceStorage.set(pair, map);
    }
    Logger.debug(`[MarketStorage] operation=addPrice; pair=${pair}; exchange=${exchange}; price=${price}`)

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
    this.priceStorage.forEach((exchangeMap, pair) => {
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
    return this.priceStorage.get(pair).get(exchange)
  }

  calculateDiff() {
    let calculatedPair = new Set<string>()
    function isPairCalculated(to: ExchangeHouses, from: ExchangeHouses) {
      return calculatedPair.has(to.concat('-').concat(from)) || calculatedPair.has(from.concat('-').concat(to))
    }

    function addPair(to: ExchangeHouses, from: ExchangeHouses) {
      calculatedPair.add(to.concat('-').concat(from))
      calculatedPair.add(from.concat('-').concat(to))
    }

    this.priceStorage.forEach((prices, pair) => {
      const priceDiff: PriceDiff = this.buildPriceDiff(pair)
      const houses = Array.from(this.priceStorage.get(pair).keys());

      for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < houses.length; j++) {
          if (i !== j && !isPairCalculated(houses[i], houses[j])) {
            priceDiff.priceDiffDetails.push(
              this.addPriceDiff(
                houses[i], houses[j], this.getPrice(pair, houses[i]) - this.getPrice(pair, houses[j]), 'Eur'))
          }
          addPair(houses[i], houses[j])
        }
      }

      if (priceDiff.priceDiffDetails.length > 0) {
        this.marketService.publishMarketPriceDifferent(priceDiff)
      }
      calculatedPair = new Set<string>()
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
