import {WsClientHandler} from "../clients/WsClientHandler";
import {
  ExchangeSockets,
  UnsubscribeRequest
} from "@oasis/share-types";

export class ExchangeManager {
  private exchanges;

  constructor() {
    this.exchanges = new Map<ExchangeSockets, WsClientHandler>()
  }

  add(websocketUrl: ExchangeSockets, socket: WsClientHandler) {
    socket.initialize(websocketUrl)
    this.exchanges.set(websocketUrl, socket)
    console.log(`[ExchangeManager] Socket initialized; url=${websocketUrl}`)
  }

  remove(websocketUrl: ExchangeSockets, request: UnsubscribeRequest) {
    this.exchanges.get(websocketUrl).unsubscribe(request)
    this.exchanges.delete(websocketUrl)
    console.log(`[ExchangeManager] Socket finalized; url=${websocketUrl}`)
  }

  size() {
    return this.exchanges.size
  }
}
