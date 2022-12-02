import {ExchangeHouses, Market, MarketFeed, Pairs, Trade} from "@oasis/share-types";
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
      this.prices.set(pair, new Map<ExchangeHouses, number>().set(exchange, price));

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

    this.tmp_print()
  }

  getPrice(pair: Pairs, exchange: ExchangeHouses) : number {
    return this.prices.get(pair).get(exchange)
  }

  tmp_print() {
    const map = new Map<Pairs, number>()
    let market: MarketFeed;

    for (const pair of this.prices.keys()) {
      console.log(pair)
      market = {
        event: 'market',
        market: pair,
        exchanges: []
      };
      map.set(pair, 0)
      for (const exchange of this.prices.get(pair).keys()) {
        console.log(exchange, this.getPrice(pair, exchange))
        market.exchanges.push(
          {
          name: exchange,
          lastPrice: {
            amount: this.getPrice(pair, exchange),
            currency: 'Eur'
          }
        });
        map.get(pair) != 0 ?
          map.set(pair, map.get(pair)-this.getPrice(pair, exchange)) :
          map.set(pair, this.getPrice(pair, exchange))
      }
      this.marketService.publishMarketSnapshot(market)
    }

    map.forEach((key, value)=>{
      console.log(key, value)
    })
  }
}
