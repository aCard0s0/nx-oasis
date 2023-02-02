import {WebsocketManager} from "../../websockets/clients/WebsocketManager";
import {
  BinanceAllMarketsSubRequest,
  BinanceSubRequest,
  CoinbaseSubTickerRequest,
  ExchangeHouses,
  KrakenSubTradeRequest
} from "@oasis/share-types";
import {BinanceWsClient} from "../../websockets/clients/BinanceWsClient";

import {KrakenWsClient} from "../../websockets/clients/KrakenWsClient";
import {CoinbaseWsClient} from "../../websockets/clients/CoinbaseWsClient";
import {BinanceAllMarketsWsClient} from "../../websockets/clients/BinanceAllMarketsWsClient";

export default async () => {
  const exchanges = new WebsocketManager()
  //exchanges.add(ExchangeHouses.Binance, new BinanceWsClient(BinanceSubRequest))
  exchanges.add(ExchangeHouses.Binance, new BinanceAllMarketsWsClient(BinanceAllMarketsSubRequest))
  //exchanges.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubTradeRequest))
  //exchanges.add(ExchangeHouses.Coinbase, new CoinbaseWsClient(CoinbaseSubTickerRequest))

  //configs.remove(ExchangeHouses.Binance, BinanceUnsubRequest)
  //services.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest2))
  //services.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest3))

  return exchanges;
}
