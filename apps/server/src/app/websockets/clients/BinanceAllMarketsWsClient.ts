import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {
  BinanceMessages,
  BinanceMiniTicker,
  BinanceSubscribeRequest,
  ExchangeSockets,
  MarketUpdate
} from "@oasis/share-types";
import {RawData} from "ws";
import {BinancePriceStorage} from "../../core/market/BinancePriceStorage";
import {MarketService} from "../../core/market/MarketService";
import Logger from "../../configs/Logger";

export class BinanceAllMarketsWsClient extends WebSocketClientHandler {

  private binancePairs: BinancePriceStorage
  private marketService = MarketService.getInstance()

  constructor(request: BinanceSubscribeRequest) {
    super(ExchangeSockets.Binance, request)
    this.binancePairs = new BinancePriceStorage()
  }

  override onSocketMessage(data: RawData) {
    const payload = <BinanceMiniTicker[]> JSON.parse(`${data}`)
    if (this.isResultNullMessage(payload)) return ;    // ignore first message

    const filterPayload = []

    payload.forEach(ticker => {
      if (ticker.s.includes('EUR')) {
        this.binancePairs.addPrice(ticker.s, parseFloat(ticker.c))
        filterPayload.push({s: ticker.s, c: ticker.c})
      }
    })

    const message: MarketUpdate = {
      event: 'binanceAllMarketUpdate',
      content: filterPayload
    }

    this.marketService.forwardBinanceMarketsUpdate(message)
    this.msgProcessor.incrementAllMarketUpdate()
  }

  isResultNullMessage(msg: any) {
    return 'result' in msg;
  }

}
