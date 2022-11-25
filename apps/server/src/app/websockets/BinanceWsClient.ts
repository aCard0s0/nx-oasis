import {WsClientHandler} from "./WsClientHandler";
import {RawData} from "ws";
import {
  AggregateTrade,
  BinanceMessages,
  BinanceSubscribeRequest,
  BinanceTrade, MiniTicker,
} from "@oasis/share-types";

export class BinanceWsClient extends WsClientHandler {

  constructor(request: BinanceSubscribeRequest) {
    super()
    this.request = request
  }

  onSocketMessage(data: RawData) {
    console.log(`Binance Socket Message; data=${data}`)

    const payload: BinanceMessages = JSON.parse(`${data}`)
    switch (payload.e) {
      case "aggTrade": {
        const aggTrade: AggregateTrade = JSON.parse(`${data}`)
        console.log(`Binance Aggregate Trade; data=${data}`)
        console.log(aggTrade.p)
        break;
      }
      case "trade": {
        const trade: BinanceTrade = JSON.parse(`${data}`)
        console.log(`Binance Trade; data=${data}`)
        console.log(trade.p)
        break;
      }
      case "24hrMiniTicker": {
        const ticker: MiniTicker = JSON.parse(`${data}`)
        console.log(`Binance MiniTicker; data=${data}`)
        console.log(ticker.c)
        break;
      }

    }
  }

}
