import {Express, Request, Response} from "express"
import {PriceCheckerCronJob} from "./app/cronjob/PriceCheckerCronJob";
import WebSocketServer from "./app/websockets/server/WebSocketServer";
import WebSocketClient from "./app/websockets/clients/WebSocketClient";

import express = require("express");
import * as process from "process";

function main() {
  const app: Express = express();
  const port = 8080;

  const server = app.listen(port, () => {
    // startWebSocketClients()
    // startWebSocketServer()
    PriceCheckerCronJob.start()

    process.send(`⚡️[server]: Server is running at http://localhost:${port}`)
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });

  WebSocketServer(server).then(r => console.log(`websocket server started ${r.path}`))

  WebSocketClient().then(exchanges => console.log(`Subscribed to ${exchanges.size()} Exchanges`))

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
}

main()






