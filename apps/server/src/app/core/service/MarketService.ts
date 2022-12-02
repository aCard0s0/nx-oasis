import {Market, MarketFeed, Trade} from "@oasis/share-types";
import {IncomingMessage} from "http";
import {WebSocket} from "ws";
import logger from "../../configs/Logger";

export class MarketService {
  private static instance: MarketService
  private sockets = new Map<string, WebSocket>()

  public static getInstance(): MarketService {
    if(!MarketService.instance) {
      return MarketService.instance = new MarketService();
    }
    return MarketService.instance;
  }

  addSocketChannel(socket: WebSocket, request: IncomingMessage) {
    this.sockets.set("socketName", socket)
    logger.info(`[MarketService] operation=addSocketChannel request=${request}; socket=${socket}`)
  }

  publishTrade(trade: Trade) {
    if (this.sockets.size > 0) {
      this.send(trade)
    }
  }

  publishMarketSnapshot(market: Market) {
    if (this.sockets.size > 0) {
      this.send(market)
    }
  }

  private send(payload: MarketFeed) {
    const data = JSON.stringify(payload)
    this.sockets.get("socketName").send(data)
    logger.info(`[MarketService] operation=send data=${data}`)
  }
}
