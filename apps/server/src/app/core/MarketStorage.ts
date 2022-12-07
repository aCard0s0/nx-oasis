import {ExchangeHouses, MarketFeed, Pairs, PriceDiff} from "@oasis/share-types";
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
    let market: MarketFeed;
    this.prices.forEach((exchangeMap, pair) => {
      market = {
        event: 'market',
        market: pair,
        exchanges: []
      };
      for (const exchange of exchangeMap.keys()) {
        market.exchanges.push(
          {
            name: exchange,
            lastPrice: {
              amount: this.getPrice(pair, exchange),
              currency: 'Eur'
            }
          });
      }
      this.marketService.publishMarketSnapshot(market)
    })
  }

  getPrice(pair: Pairs, exchange: ExchangeHouses) : number {
    return this.prices.get(pair).get(exchange)
  }

  calculateDiff() {
    const priceDiff: PriceDiff = {
      event: 'priceDiff',
      priceDiffDetails: []
    }
    this.pairs.forEach( pair => {
      const houses = Array.from(this.prices.get(pair).keys());
      for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < houses.length; j++) {
          if (i !== j) {
            priceDiff.priceDiffDetails.push({
              pair: pair,
              from: houses[i],
              to: houses[j],
              priceDiff: {
                amount: this.getPrice(pair, houses[i]) - this.getPrice(pair, houses[j]),
                currency: 'Eur'
              }
            })
          }
        }
      }
      this.marketService.publishMarketPriceDifferent(priceDiff)
    })
  }
}
