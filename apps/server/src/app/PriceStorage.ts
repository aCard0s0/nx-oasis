import {ExchangeHouses, Pairs} from "@oasis/share-types";

export class PriceStorage {
  private static instance: PriceStorage
  private prices = new Map<Pairs, Map<ExchangeHouses, number>>()

  public static getInstance(): PriceStorage {
    if(!PriceStorage.instance) {
      return PriceStorage.instance = new PriceStorage();
    }
    return PriceStorage.instance;
  }

  add(pair: Pairs, exchange: ExchangeHouses, price: number) {
    if (!this.prices.has(pair)) {
      this.prices.set(pair, new Map<ExchangeHouses, number>().set(exchange, price));

    } else {
      this.prices.get(pair).set(exchange, price)
    }
  }

  get(pair: Pairs, exchange: ExchangeHouses) : number {
    return this.prices.get(pair).get(exchange)
  }

  tmp_print() {
    const map = new Map<Pairs, number>()

    for (const pair of this.prices.keys()) {
      console.log(pair)
      map.set(pair, 0)
      for (const exchange of this.prices.get(pair).keys()) {
        console.log(exchange, this.prices.get(pair).get(exchange))
        map.get(pair) != 0 ?
          map.set(pair, map.get(pair)-this.prices.get(pair).get(exchange)) :
          map.set(pair, this.prices.get(pair).get(exchange))
      }
    }

    map.forEach((key, value)=>{
      console.log(key, value)
    })
  }
}
