import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {
  ExchangeHouses,
  UnsubscribeRequest
} from "@oasis/share-types";
import logger from "../../configs/Logger";
import {WebSocket} from "ws";

export class WebsocketManager {
  private exchanges: Map<ExchangeHouses, WebSocketClientHandler>;

  constructor() {
    this.exchanges = new Map<ExchangeHouses, WebSocketClientHandler>()
  }

  add(house: ExchangeHouses, socket: WebSocketClientHandler) {
    this.exchanges.set(house, socket)
    logger.info(`[ExchangeManager] operation=add; msg='Socket initialized'; house=${house};`)
  }

  get(house: ExchangeHouses) {
    if (!this.exchanges.has(house)) {
      logger.warn(`[ExchangeManager] operation=get; msg='exchange house doesn't exist'; house=${house};`)
    }
    logger.info(`[ExchangeManager] operation=get; house=${house}; `)
    return this.exchanges.get(house)
  }

  remove(house: ExchangeHouses, request: UnsubscribeRequest) {
    const socket: WebSocketClientHandler = this.exchanges.get(house)

    if (socket.getState() === WebSocket.OPEN) {
      socket.unsubscribe(request)
      socket.close()
      this.exchanges.delete(house)
      logger.info(`[ExchangeManager] operation=remove; msg='Socket finalized'; house=${house}`)
      return socket
    }

    logger.warn(`[ExchangeManager] operation=remove; msg='Socket is not open to be close'; house=${house}`)
  }

  size() {
    return this.exchanges.size
  }

  closeAllSockets() {
    this.exchanges.forEach((socket, house) => {
      socket.close()
      logger.info(`[ExchangeManager] operation=closeAllSockets; msg='Socket finalized'; house=${house}`)
    })

    // Second sweep, hard close for everyone who's left
    setTimeout(() => {
      this.exchanges.forEach((socket, house) => {
        if ([WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING]
              .some(state => state === socket.getState())) {
          socket.terminate();
        }
      });
    }, 5000);
  }
}
