import {ExchangeManager} from "../exchanges/ExchangeManager";
import {ExchangeHouses, ExchangeSockets} from "@oasis/share-types";
import {BinanceWsClient} from "./BinanceWsClient";
import {
  BinanceSubRequest,
  CoinbaseSubTickerRequest,
  KrakenSubTradeRequest
} from "../../configs/ExchangeRequests";
import {KrakenWsClient} from "./KrakenWsClient";
import {CoinbaseWsClient} from "./CoinbaseWsClient";

export default async () => {
  const exchanges = new ExchangeManager()
  exchanges.add(ExchangeHouses.Binance, new BinanceWsClient(BinanceSubRequest))
  exchanges.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubTradeRequest))
  exchanges.add(ExchangeHouses.Coinbase, new CoinbaseWsClient(CoinbaseSubTickerRequest))

  //configs.remove(ExchangeHouses.Binance, BinanceUnsubRequest)
  //services.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest2))
  //services.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest3))

  return exchanges;
}
