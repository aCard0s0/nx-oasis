import {ExchangeHouses, MarketFeed, Pairs} from "@oasis/share-types";
import {MarketService} from "./service/MarketService";

export class MarketStorage {
  private static instance: MarketStorage
  private prices = new Map<Pairs, Map<ExchangeHouses, number>>()
  private marketService = MarketService.getInstance()

  public static getInstance(): MarketStorage {
    if(!MarketStorage.instance) {
      return MarketStorage.instance = new MarketStorage();
    }
    return MarketStorage.instance;
  }

  addPrice(pair: Pairs, exchange: ExchangeHouses, price: number) {
    if (!this.prices.has(pair)) {
      const map = new Map<ExchangeHouses, number>()
      map.set(exchange, price)
      this.prices.set(pair, map);

    } else {
      this.prices.get(pair).set(exchange, price)
    }

    this.marketService.publishTrade({
      event: 'trade',
      market: pair,
      exchange: exchange,
      lastPrice: {
        amount: price,
        currency: 'Eur'
      }
    })
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
}
