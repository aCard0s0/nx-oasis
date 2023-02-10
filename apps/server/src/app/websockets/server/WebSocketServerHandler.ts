import {RawData, WebSocketServer, WebSocket} from "ws";
import {IncomingMessage} from "http";
import {MarketService} from "../../core/market/MarketService";
import {WebSocketServerMessages} from "@oasis/share-types";
import Logger from "../../configs/Logger";

export class WebSocketServerHandler {
  private wsServer: WebSocketServer
  private marketService: MarketService = MarketService.getInstance()

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer
    this.wsServer.on('listening', () => this.onSocketListening())
    this.wsServer.on('connection', (socket, request) => this.onSocketConnected(socket, request))
  }

  onSocketUpgrading(request, socket, head) {
    this.wsServer.handleUpgrade(request, socket, head, (websocket) => {
      this.wsServer.emit("connection", websocket, request);
    })
  }
  onSocketListening() {
    Logger.info(`[WebSocketServerHandler] operation=onSocketListening`)
  }
  onSocketConnected(socket: WebSocket, request: IncomingMessage) {
    this.marketService.addSocketChannel(socket, request)

    socket.on('message', (data) => {this.onSocketMessage(socket, data)})
    socket.on('close', (code, reason) => this.onSocketClosed(socket, code, reason))
  }

  onSocketMessage(socket: WebSocket, data: RawData) {
    Logger.info(`[WebSocketServerHandler] operation=onSocketMessage; data=${data}`)
    const payload: WebSocketServerMessages = JSON.parse(`${data}`)

    switch (payload.event) {
      case "echo" : {
        socket.send(data)
        break;
      }
      case "systemNotice": {
        console.log('TODO')
      }
    }
  }

  onSocketClosed(socket: WebSocket, code: number, reason: Buffer) {
    Logger.info(`[WebSocketServerHandler] operation=onSocketClosed; code=${code}, reason=${reason}`)
    this.marketService.removeSocketChannel(socket)
  }
}
