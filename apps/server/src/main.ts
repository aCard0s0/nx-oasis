import {ExchangeSockets} from "@oasis/share-types";
import {ExchangeHandler} from "./app/exchanges/ExchangeHandler";
import {BinanceSubRequest, KrakenSubRequestTrade} from "./app/configs/ExchangeRequests";
import {KrakenWsClient} from "./app/websockets/KrakenWsClient";
import {BinanceWsClient} from "./app/websockets/BinanceWsClient";

function main() {
  const exchanges = new ExchangeHandler()
  exchanges.add(ExchangeSockets.Binance, new BinanceWsClient(BinanceSubRequest))
  //configs.remove(ExchangeHouses.Binance, BinanceUnsubRequest)
  exchanges.add(ExchangeSockets.Kraken, new KrakenWsClient(KrakenSubRequestTrade))
  //exchanges.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest2))
  //exchanges.add(ExchangeHouses.Kraken, new KrakenWsClient(KrakenSubRequest3))
}

main()
