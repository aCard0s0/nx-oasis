import {Market, MarketFeed, Trade} from "@oasis/share-types";
import {IncomingMessage} from "http";
import {WebSocket} from "ws";

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
    console.log(`Socket channel added`)
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

  private send(message: MarketFeed) {
    const data = JSON.stringify(message)
    this.sockets.get("socketName").send(data)
    console.log(`MarketService send message=${data}`)
  }
}
