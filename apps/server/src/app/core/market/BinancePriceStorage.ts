
export class BinancePriceStorage {

  private priceStorage = new Map<string, number>()  // TODO: string to Pair

  addPrice(pair: string, price: number) {
    this.priceStorage.set(pair, price)
  }


}
