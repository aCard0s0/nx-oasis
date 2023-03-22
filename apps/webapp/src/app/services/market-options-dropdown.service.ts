import {Injectable} from "@angular/core";
import {ExchangeHouses, Intervals, Pairs} from "@oasis/share-types";

@Injectable({
  providedIn: 'root'
})
export class MarketOptionsDropdownService {

  getExchangeHouses() {
    return [
      ExchangeHouses.Binance,
      ExchangeHouses.Coinbase,
      ExchangeHouses.Kraken
    ];

  }

  getPairs() {
    return [
      Pairs.BTC_EUR,
      Pairs.ETH_EUR,
      Pairs.ADA_EUR
    ];
  }

  getIntervals() {
    return [
      //Intervals.minute1,
      Intervals.hour1,
      Intervals.day1
    ];
  }
}
