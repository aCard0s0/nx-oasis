import {WebSocket, RawData} from "ws";
import {
  ExchangeSockets, SubscribeRequest, UnsubscribeRequest
} from "@oasis/share-types";
import {MarketStorage} from "../../core/MarketStorage";
import logger from "../../configs/Logger";

export abstract class WsClientHandler {
  private ws: WebSocket
  protected request: SubscribeRequest
  protected prices: MarketStorage = MarketStorage.getInstance()

  initialize(websocketUrl: ExchangeSockets) {
    this.ws = new WebSocket(websocketUrl)
    this.ws.on('open', () => this.onSocketOpen())
    this.ws.on('message', (data) => this.onSocketMessage(data))
    this.ws.on('error', (error) => this.onSocketError(error))
    this.ws.on('close', (data) => this.onSocketClose(data))
  }

  subscribe(request: SubscribeRequest) {
    logger.info(`[WsClientHandler] operation=subscribe; request=${request}`)
    this.ws.send(JSON.stringify(request))
  }

  unsubscribe(request: UnsubscribeRequest) {
    logger.info(`[WsClientHandler] operation=unsubscribe; request=${request}`)
    this.ws.send(JSON.stringify(request))
  }

  private onSocketOpen() {
    logger.debug(`[WsClientHandler] operation=onSocketOpen`)
    this.subscribe(this.request)
  }

  protected onSocketMessage(data:RawData) {
    logger.debug(`[WsClientHandler] operation=onSocketMessage; data=${data}`)
  }

  private onSocketError(error: Error) {
    logger.debug(`[WsClientHandler] operation=onSocketError; name=${error.name}; message=${error.message}`)
  }

  private onSocketClose(code: number) {
    logger.debug(`[WsClientHandler] operation=onSocketClose; code=${code}`)
  }

}
