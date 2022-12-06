import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import {ExchangeHouses, KrakenOHLC, KrakenSubscribeRequest, KrakenTicker, Pairs} from "@oasis/share-types";
import logger from "../../configs/Logger";

export class KrakenWsClient extends WebSocketClientHandler {

  constructor(request: KrakenSubscribeRequest) {
    super()
    this.request = request
  }

  onSocketMessage(data: RawData) {
    logger.debug(`[KrakenWsClient] operation=onSocketMessage; data=${data}`)
    const payload = JSON.parse(`${data}`)
    if (payload.event == 'heartbeat') return;

    switch (payload[2]) {
      case "trade": {
        const trade: any = JSON.parse(`${data}`)
        this.prices.addPrice(Pairs.ETH_EUR, ExchangeHouses.Kraken, parseFloat(trade[1][0][0]))
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
      default:
        logger.warn(`[KrakenWsClient] operation=onSocketMessage; msg='event ignored'; data=${data}`)
    }
  }
}
