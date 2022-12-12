import {Express, Request, Response} from "express"
import {MarketUpdate} from "./app/cronjob/MarketUpdate";
import StartWebSocketServer from "./app/websockets/server/StartWebSocketServer";
import StartWebSocketClient from "./app/core/exchange/StartWebSocketClient";

import express = require("express");
import logger from "./app/configs/Logger";
import {ClientMessagesLogger} from "./app/cronjob/ClientMessagesLogger";

function main() {
  const app: Express = express();
  const port = 8080;

  const server = app.listen(port, () => {
    ClientMessagesLogger.start()
    MarketUpdate.start()
    logger.info(`Server is running at http://localhost:${port}`)
  });

  StartWebSocketServer(server).then(() => logger.debug(`Websocket Server ready`))

  StartWebSocketClient().then(exchanges => logger.debug(`Subscribed to ${exchanges.size()} Exchanges`))

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
}

main()






