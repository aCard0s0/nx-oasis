import {ExchangeHandler} from "../exchanges/ExchangeHandler";
import {ExchangeSockets} from "@oasis/share-types";
import {BinanceWsClient} from "./BinanceWsClient";
import {BinanceSubRequest, KrakenSubTradeRequest} from "../configs/ExchangeRequests";
import {KrakenWsClient} from "./KrakenWsClient";
import {PriceCheckerCronJob} from "../cronjob/PriceCheckerCronJob";

export const startWebSocketClients = () => {
  const exchanges = new ExchangeHandler()
  exchanges.add(ExchangeSockets.Binance, new BinanceWsClient(BinanceSubRequest))
  //configs.remove(ExchangeHouses.Binance, BinanceUnsubRequest)
  exchanges.add(ExchangeSockets.Kraken, new KrakenWsClient(KrakenSubTradeRequest))
  //exchanges.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest2))
  //exchanges.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest3))
  PriceCheckerCronJob.start()
}
