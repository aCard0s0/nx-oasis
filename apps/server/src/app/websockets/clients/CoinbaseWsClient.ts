import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import logger from "../../configs/Logger";
import {
  CoinbaseMessages,
  CoinbaseSubscribeRequest, ExchangeHouses,
  ExchangeSockets, PairsConverter, TickerCb
} from "@oasis/share-types";

export class CoinbaseWsClient extends WebSocketClientHandler {

  constructor(request: CoinbaseSubscribeRequest) {
    super(ExchangeSockets.Coinbase, request)
  }

  override onSocketMessage(data: RawData) {
    logger.debug(`[CoinbaseWsClient] operation=onSocketMessage; data=${data}`)

    const payload: CoinbaseMessages = JSON.parse(`${data}`)
    switch (payload.type) {
      case "ticker": {
        const ticker: TickerCb = JSON.parse(`${data}`)
        this.prices.addPrice(
          PairsConverter.convert(ticker.product_id), ExchangeHouses.Coinbase, parseFloat(ticker.price))
        break;
      }
      default :
        logger.warn(`[CoinbaseWsClient] operation=onSocketMessage; msg='event ignored'; data=${data}`)
    }
  }
}
