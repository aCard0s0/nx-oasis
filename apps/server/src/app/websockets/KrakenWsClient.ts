import {WsClientHandler} from "./WsClientHandler";
import {RawData} from "ws";
import {ExchangeHouses, KrakenOHLC, KrakenSubscribeRequest, KrakenTicker, Pairs} from "@oasis/share-types";

export class KrakenWsClient extends WsClientHandler {

  constructor(request: KrakenSubscribeRequest) {
    super()
    this.request = request
  }

  onSocketMessage(data: RawData) {
    //console.log(`Kraken Socket Message; data=${data}`)
    const payload = JSON.parse(`${data}`)

    switch (payload[2]) {
      case "trade": {
        console.log(`Kraken Trade; data=${data}`)
        const trade: any = JSON.parse(`${data}`)
        this.prices.add(Pairs.ETH_EUR, ExchangeHouses.Kraken, parseFloat(trade[1][0][0]))

        break;
      }

      case "ticker": {
        const ticker: KrakenTicker = JSON.parse(`${data}`)
        break;
      }
      case "ohlc": {
        const ohlc: KrakenOHLC = JSON.parse(`${data}`)
        break;
      }
      default: //console.log(`Kraken message ignore; message=${data}`)
    }
  }
}
