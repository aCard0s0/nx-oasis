import {MarketStorage} from "../../../app/core/market/MarketStorage";
import {ExchangeHouses, Pairs} from "@oasis/share-types";

describe('Market Storage', () => {

  it('should be same instance', () => {
    const storage = MarketStorage.getInstance();
    const storage2 = MarketStorage.getInstance();
    expect(storage).toEqual(storage2)
    expect(storage).toMatchObject(storage2)
  });

  it('should add price to map', () => {
    const storage = MarketStorage.getInstance();
    storage.addPrice(Pairs.BTC_EUR, ExchangeHouses.Binance, 5.4);
    expect(storage.getPrice(Pairs.BTC_EUR, ExchangeHouses.Binance)).toEqual(5.4)
  });
})
