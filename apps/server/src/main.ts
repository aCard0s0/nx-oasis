import {Express, Request, Response} from "express"
import {MarketUpdate} from "./app/cronjob/MarketUpdate";
import LoadExchangePairs from "./app/core/exchange/LoadExchangePairs";
import StartWebSocketServer from "./app/websockets/server/StartWebSocketServer";
import StartWebSocketClient from "./app/core/exchange/StartWebSocketClient";

import express = require("express");
import Logger from "./app/configs/Logger";
import {ClientMessagesLogger} from "./app/cronjob/ClientMessagesLogger";

import {binanceRoute} from "./app/api/BinanceRoutes"; "./app/http/server/BinanceRoutes";

function main() {
  const app: Express = express();
  const port = 8080;

  const server = app.listen(port, () => {
    ClientMessagesLogger.start()
    MarketUpdate.start()
    Logger.info(`Server is running at http://localhost:${port}`)
  });

  LoadExchangePairs()

  StartWebSocketServer(server).then(() => Logger.debug(`Websocket Server ready`))

  StartWebSocketClient().then(exchanges => Logger.debug(`Subscribed to ${exchanges.size()} Exchanges`))

  app.use('/binance', binanceRoute)

}

main()






