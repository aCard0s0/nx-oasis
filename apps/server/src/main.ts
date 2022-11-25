import {Express, Request, Response} from "express"
import express = require("express");
import {startWebSocketClients} from "./app/websockets/WsClient";

const app: Express = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  startWebSocketClients()
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
