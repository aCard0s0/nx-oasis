import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import Logger from "../../configs/Logger";
import {
  CoinbaseMessages,
  CoinbaseSubscribeRequest, ErrorMessageCb, ExchangeHouses,
  ExchangeSockets, PairsConverter, CBSubscription, TickerCb
} from "@oasis/share-types";

export class CoinbaseWsClient extends WebSocketClientHandler {

  constructor(request: CoinbaseSubscribeRequest) {
    super(ExchangeSockets.Coinbase, request)
  }

  override onSocketMessage(data: RawData) {
    Logger.debug(`[CoinbaseWsClient] operation=onSocketMessage; data=${data}`)

    const payload: CoinbaseMessages = JSON.parse(`${data}`)
    switch (payload.type) {
      case 'subscriptions': {
        const subs: CBSubscription = JSON.parse(`${data}`)
        if (subs.channels.length > 0) {
          const channels = JSON.stringify(subs.channels);
          Logger.info(`[CoinbaseWsClient] operation=onSocketMessage; msg='Subscriptions successful' channels=${channels}`)
        }
        break;
      }
      case 'error': {
        const error: ErrorMessageCb = JSON.parse(`${data}`)
        Logger.error(`[CoinbaseWsClient] operation=onSocketMessage; msg='Subscriptions successful'; reason=${error.reason}`)
        break;
      }
      case 'ticker': {
        const ticker: TickerCb = JSON.parse(`${data}`)
        this.priceStorage.addPrice(
          PairsConverter.convertToPairEnum(ticker.product_id), ExchangeHouses.Coinbase, parseFloat(ticker.price))
        this.msgProcessor.incrementCoinbaseTrade()
        break;
      }
      default :
        Logger.warn(`[CoinbaseWsClient] operation=onSocketMessage; msg='event ignored'; data=${data}`)
    }
  }
}
