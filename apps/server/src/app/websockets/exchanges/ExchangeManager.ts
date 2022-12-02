import {WsClientHandler} from "../clients/WsClientHandler";
import {
  ExchangeSockets,
  UnsubscribeRequest
} from "@oasis/share-types";

export class ExchangeManager {
  private exchanges = new Map<ExchangeSockets, WsClientHandler>()

  add(websocketExchangeUrl: ExchangeSockets, socket: WsClientHandler) {
    socket.initialize(websocketExchangeUrl)
    this.exchanges.set(websocketExchangeUrl, socket)
    console.log(`${websocketExchangeUrl} socket initialized`)
  }

  remove(exchange: ExchangeSockets, request: UnsubscribeRequest) {
    this.exchanges.get(exchange).unsubscribe(request)
    this.exchanges.delete(exchange)
    console.log(`${exchange} socket finalized`)
  }

  size() {
    return this.exchanges.size
  }
}
