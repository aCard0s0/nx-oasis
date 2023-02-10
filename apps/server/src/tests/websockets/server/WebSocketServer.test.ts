import WebSocketServer from "../../../app/websockets/server/StartWebSocketServer";
import express = require("express");
import {WebSocket} from "ws";
import {Express} from "express";
import Logger from "../../../app/configs/Logger";
import {waitForSocketState} from "../WebSocketTestUtils";

const port = 8080;
jest.setTimeout(5000)

describe("WebSocket Server", () => {
  let server;
  beforeAll(async () => {

    const app: Express = express();
    // Start server
    server = app.listen(port, () => {
      Logger.info(`Server is running at http://localhost:${port}`)
    });
    await WebSocketServer(server)
  });
  afterAll(() => {
    // Close server
    server.close(() => {
      Logger.info(`Server stop running`)
    })
  });
  test("Server echoes the message it receives from client", async () => {
    const client: WebSocket = new WebSocket(`ws://localhost:${port}/websockets`);
    await waitForSocketState(client, client.OPEN);

    let responseMessage;
    client.addListener('message', (data) => {
      responseMessage = JSON.parse(`${data}`)
      client.close()
    })

    const testMessage = {event: 'echo'}
    client.send(JSON.stringify(testMessage));
    await waitForSocketState(client, client.CLOSED);

    expect(responseMessage).toStrictEqual(testMessage);
  });
});


