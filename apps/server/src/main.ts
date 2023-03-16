import {Express} from "express"
import * as cors from 'cors';
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

  // If you have more origins you would like to add, you can add them to the array below.
  const allowedOrigins = ['http://localhost:4200'];
  const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

  app.use(cors(options));
  app.use('/binance', binanceRoute);

  const server = app.listen(port, () => {
    ClientMessagesLogger.start()
    MarketUpdate.start()
    Logger.info(`Server is running at http://localhost:${port}`)
  });

  LoadExchangePairs();

  StartWebSocketServer(server).then(() => Logger.debug(`Websocket Server ready`));

  StartWebSocketClient().then(exchanges => Logger.debug(`Subscribed to ${exchanges.size()} Exchanges`));

}

main()






