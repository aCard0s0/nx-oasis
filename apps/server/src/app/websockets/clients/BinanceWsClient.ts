import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import {
  AggregateTrade,
  BinanceMessages,
  BinanceSubscribeRequest,
  BinanceTrade,
  ExchangeSockets,
  BinanceMiniTicker,
} from "@oasis/share-types";
import Logger from "../../configs/Logger";

export class BinanceWsClient extends WebSocketClientHandler {

  constructor(request: BinanceSubscribeRequest) {
    super(ExchangeSockets.Binance, request)
  }

  override onSocketMessage(data: RawData) {
    Logger.debug(`[BinanceWsClient] operation=onSocketMessage; data=${data}`)

    const payload: BinanceMessages = JSON.parse(`${data}`)

    switch (payload.e) {
      case "aggTrade": {
        const aggTrade: AggregateTrade = JSON.parse(`${data}`)
        //this.priceStorage.addPrice(PairsConverter.convert(aggTrade.s), ExchangeHouses.Binance, parseFloat(aggTrade.p))
        console.log(`[${new Date().toISOString()}] AggTrade: `+ aggTrade.p)
        this.msgProcessor.incrementBinanceAggTrade()
        break;
      }
      case "trade": {
        const trade: BinanceTrade = JSON.parse(`${data}`)
        console.log(trade.p)
        break;
      }
      case "24hrMiniTicker": {
        const ticker: BinanceMiniTicker = JSON.parse(`${data}`)
        console.log(`[${new Date().toISOString()}] Ticker: ${ticker.c}`)
        this.msgProcessor.incrementBinanceMiniTicker()
        break;
      }
      default :
        // Kraken Websocket does not send a subscription success or error message in case that the pair or channel does not exist
        Logger.warn(`[BinanceWsClient] operation=onSocketMessage; msg='event ignored'; data=${data}`)
    }
  }

}
