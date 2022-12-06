import {Express, Request, Response} from "express"
import {PriceCheckerCronJob} from "./app/cronjob/PriceCheckerCronJob";
import WebSocketServer from "./app/websockets/server/WebSocketServer";
import WebSocketClient from "./app/websockets/clients/WebSocketClientManager";

import express = require("express");
import logger from "./app/configs/Logger";

function main() {
  const app: Express = express();
  const port = 8080;

  const server = app.listen(port, () => {
    PriceCheckerCronJob.start()
    logger.info(`Server is running at http://localhost:${port}`)
  });

  WebSocketServer(server).then(() => logger.debug(`Websocket Server ready`))

  WebSocketClient().then(exchanges => logger.debug(`Subscribed to ${exchanges.size()} Exchanges`))

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
}

main()






