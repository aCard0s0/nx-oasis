import {WebSocketClientHandler} from "../clients/WebSocketClientHandler";
import {
  ExchangeSockets,
  UnsubscribeRequest
} from "@oasis/share-types";

export class ExchangeManager {
  private exchanges;

  constructor() {
    this.exchanges = new Map<ExchangeSockets, WebSocketClientHandler>()
  }

  add(websocketUrl: ExchangeSockets, socket: WebSocketClientHandler) {
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
