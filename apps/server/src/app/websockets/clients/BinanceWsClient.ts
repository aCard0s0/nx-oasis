import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import {
  AggregateTrade,
  BinanceMessages,
  BinanceSubscribeRequest,
  BinanceTrade,
  ExchangeHouses,
  ExchangeSockets,
  MiniTicker,
  PairsConverter,
} from "@oasis/share-types";
import logger from "../../configs/Logger";

export class BinanceWsClient extends WebSocketClientHandler {

  constructor(request: BinanceSubscribeRequest) {
    super(ExchangeSockets.Binance, request)
  }

  override onSocketMessage(data: RawData) {
    logger.debug(`[BinanceWsClient] operation=onSocketMessage; data=${data}`)

    const payload: BinanceMessages = JSON.parse(`${data}`)
    switch (payload.e) {
      case "aggTrade": {
        const aggTrade: AggregateTrade = JSON.parse(`${data}`)
        this.prices.addPrice(
          PairsConverter.convert(aggTrade.s), ExchangeHouses.Binance, parseFloat(aggTrade.p))
        break;
      }
      case "trade": {
        const trade: BinanceTrade = JSON.parse(`${data}`)
        console.log(trade.p)
        break;
      }
      case "24hrMiniTicker": {
        const ticker: MiniTicker = JSON.parse(`${data}`)
        console.log(ticker.c)
        break;
      }
      default :
        logger.warn(`[BinanceWsClient] operation=onSocketMessage; msg='event ignored'; data=${data}`)
    }
  }

}
