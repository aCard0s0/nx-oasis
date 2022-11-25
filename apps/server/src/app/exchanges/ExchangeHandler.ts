import {WsClientHandler} from "../websockets/WsClientHandler";
import {
  ExchangeSockets,
  UnsubscribeRequest
} from "@oasis/share-types";

export class ExchangeHandler {
  private exchanges = new Map<ExchangeSockets, WsClientHandler>()

  add(exchange: ExchangeSockets, socket: WsClientHandler) {
    socket.initialize(exchange)
    this.exchanges.set(exchange, socket)
    console.log(`${exchange} socket initialized`)
  }

  remove(exchange: ExchangeSockets, request: UnsubscribeRequest) {
    this.exchanges.get(exchange).unsubscribe(request)
    this.exchanges.delete(exchange)
    console.log(`${exchange} socket finalized`)
  }
}
