import {WebSocket, RawData} from "ws";
import {
  ExchangeSockets, SubscribeRequest, UnsubscribeRequest
} from "@oasis/share-types";
import {MarketStorage} from "../../core/market/MarketStorage";
import Logger from "../../configs/Logger";
import {ClientMessagesProcessor} from "../../core/metrics/ClientMessagesProcessor";

export abstract class WebSocketClientHandler {
  private ws: WebSocket
  protected request: SubscribeRequest;
  protected priceStorage: MarketStorage = MarketStorage.getInstance()
  protected msgProcessor: ClientMessagesProcessor = ClientMessagesProcessor.getInstance()

  protected constructor(websocketUrl: ExchangeSockets, request: SubscribeRequest) {
    this.request = request
    this.ws = new WebSocket(websocketUrl)
    this.ws.on('open', () => this.onSocketOpen())
    this.ws.on('message', (data) => this.onSocketMessage(data))
    this.ws.on('error', (error) => this.onSocketError(error))
    this.ws.on('close', (data) => this.onSocketClose(data))
  }

  protected subscribe(request: SubscribeRequest) {
    const req = JSON.stringify(request)
    Logger.debug(`[WebSocketClientHandler] operation=subscribe; request=${req}`)
    this.ws.send(req)
  }

  unsubscribe(request: UnsubscribeRequest) {
    const req = JSON.stringify(request)
    Logger.debug(`[WebSocketClientHandler] operation=unsubscribe; request=${req}`)
    this.ws.send(req)
  }

  private onSocketOpen() {
    Logger.debug(`[WebSocketClientHandler] operation=onSocketOpen`)
    this.subscribe(this.request)
  }

  protected onSocketMessage(data:RawData) {
    Logger.debug(`[WebSocketClientHandler] operation=onSocketMessage; data=${data}`)
  }

  private onSocketError(error: Error) {
    Logger.error(`[WebSocketClientHandler] operation=onSocketError; name=${error.name}; message=${error.message}`)
  }

  private onSocketClose(code: number) {
    Logger.info(`[WebSocketClientHandler] operation=onSocketClose; code=${code}`)
  }

  getState() {
    return this.ws.readyState
  }

  close() {
    this.ws.close()
  }

  terminate() {
    this.ws.terminate()
  }
}
