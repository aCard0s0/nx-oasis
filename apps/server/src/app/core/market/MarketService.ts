import {Market, MarketFeed, PriceDiff} from "@oasis/share-types";
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
    const name = new URL(request.headers.host + request.url).searchParams.get("name")
    this.sockets.set(name, socket)
    logger.info(`[MarketService] operation=addSocketChannel; websocketName=${name}`)
  }

  removeSocketChannel(socket: WebSocket) {
    this.sockets.delete('socketName')
    logger.info(`[MarketService] operation=removeSocketChannel; socket=${socket}`)
  }

  publishMarketSnapshot(market: Market) {
    if (this.sockets.has('market')) {
      this.send(market, this.sockets.get('market'))
    }
  }

  publishMarketPriceDifferent(message: PriceDiff) {
    if (this.sockets.has('priceDiff')) {
      this.send(message, this.sockets.get('priceDiff'))
    }
  }

  private send(payload: MarketFeed, socket: WebSocket) {
    const data = JSON.stringify(payload)
    socket.send(data)
    logger.debug(`[MarketService] operation=send data=${data}`)
  }

}
