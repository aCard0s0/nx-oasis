import {WebSocketClientHandler} from "../../websockets/clients/WebSocketClientHandler";
import {
  ExchangeHouses,
  UnsubscribeRequest
} from "@oasis/share-types";
import logger from "../../configs/Logger";

export class ExchangeManager {
  private exchanges;

  constructor() {
    this.exchanges = new Map<ExchangeHouses, WebSocketClientHandler>()
  }

  add(house: ExchangeHouses, socket: WebSocketClientHandler) {
    this.exchanges.set(house, socket)
    logger.info(`[ExchangeManager] operation=add; msg='Socket initialized'; house=${house};`)
  }

  remove(house: ExchangeHouses, request: UnsubscribeRequest) {
    this.exchanges.get(house).unsubscribe(request)
    this.exchanges.delete(house)
    logger.info(`[ExchangeManager] operation=remove; msg='Socket finalized'; house=${house}`)
  }

  size() {
    return this.exchanges.size
  }
}
