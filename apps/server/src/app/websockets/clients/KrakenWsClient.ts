import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import {
  ExchangeHouses, ExchangeSockets,
  KrakenOHLC,
  KrakenSubscribeRequest,
  KrakenTicker,
  PairsConverter
} from "@oasis/share-types";
import logger from "../../configs/Logger";

export class KrakenWsClient extends WebSocketClientHandler {

  constructor(request: KrakenSubscribeRequest) {
    super(ExchangeSockets.Kraken, request)
  }

  override onSocketMessage(data: RawData) {
    logger.debug(`[KrakenWsClient] operation=onSocketMessage; data=${data}`)
    const payload = JSON.parse(`${data}`)
    if (payload.event == 'heartbeat') return;

    switch (payload[2]) {
      case "trade": {
        const trade: any = JSON.parse(`${data}`)   // TODO: build obj?
        this.prices.addPrice(
          PairsConverter.convert(trade[3]), ExchangeHouses.Kraken, parseFloat(trade[1][0][0]))
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
