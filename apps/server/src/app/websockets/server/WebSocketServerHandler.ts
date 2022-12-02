import {RawData, ServerOptions, WebSocketServer, WebSocket} from "ws";
import {IncomingMessage} from "http";
import {MarketService} from "../../core/service/MarketService";
import {WebSocketServerMessages} from "@oasis/share-types";

export class WebSocketServerHandler {
  private wsServer: WebSocketServer
  private marketService: MarketService

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer
  }
  initialize() {
    this.marketService = MarketService.getInstance()

    this.wsServer.on("listening", () => console.log(`Server listening on port`))
    this.wsServer.on('connection', (socket, request) => this.onSocketConnected(socket, request))
  }

  onSocketUpgrading(request, socket, head) {
    console.log("Socket server handling upgrade")
    this.wsServer.handleUpgrade(request, socket, head, (websocket) => {
      this.wsServer.emit("connection", websocket, request);
    })
  }

  onSocketConnected(socket: WebSocket, request: IncomingMessage) {
    console.log("New websocket connection")
    this.marketService.addSocketChannel(socket, request)

    socket.on('message', (data) => {this.onSocketMessage(socket, data)})
    socket.on('close', (code, reason) => this.onSocketClosed(socket, code, reason))
  }

  onSocketMessage(socket: WebSocket, data: RawData) {
    const payload: WebSocketServerMessages = JSON.parse(`${data}`)
    console.log("Received: ", payload)

    switch (payload.event) {
      case "systemNotice": {
        console.log('TODO')
      }
    }
  }

  onSocketClosed(socket: WebSocket, code: number, reason: Buffer) {
    console.log(`Client has disconnected; code=${code}, reason=${reason}`)
  }
}
