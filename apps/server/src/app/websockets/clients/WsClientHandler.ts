import {WebSocket, RawData} from "ws";
import {
  ExchangeSockets, SubscribeRequest, UnsubscribeRequest
} from "@oasis/share-types";
import {MarketStorage} from "../../core/MarketStorage";

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
    console.log(`Subscribe request: ${JSON.stringify(request)}`)
    this.ws.send(JSON.stringify(request))
  }

  unsubscribe(request: UnsubscribeRequest) {
    console.log(`Unsubscribe request: ${JSON.stringify(request)}`)
    this.ws.send(JSON.stringify(request))
  }

  private onSocketOpen() {
    console.log('Socket open connection')
    this.subscribe(this.request)
  }

  protected onSocketMessage(data:RawData) {
    console.log(`Socket message, data=${data}`)
  }

  private onSocketError(error: Error) {
    console.log(`Socket error, name=${error.name}, message=${error.message}`)
  }

  private onSocketClose(code: number) {
    console.log(`Socket close, code=${code}`)
  }

}
