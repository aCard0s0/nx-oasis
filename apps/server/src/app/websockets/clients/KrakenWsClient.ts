import {WebSocketClientHandler} from "./WebSocketClientHandler";
import {RawData} from "ws";
import {
  ExchangeHouses, ExchangeSockets,
  KrakenSubscribeRequest,
  PairsConverter, krakenSubscription, KrakenMessages, KrakenSystemStatus, KrakenTradeObj
} from "@oasis/share-types";
import logger from "../../configs/Logger";

export class KrakenWsClient extends WebSocketClientHandler {

  constructor(request: KrakenSubscribeRequest) {
    super(ExchangeSockets.Kraken, request)
  }

  override onSocketMessage(data: RawData) {
    logger.debug(`[KrakenWsClient] operation=onSocketMessage; data=${data}`)

    // ignore heartbeat messages
    let payload: KrakenMessages = JSON.parse(`${data}`)
    if (payload.event == 'heartbeat') return;

    // messages don't appear as key-value pairs
    if (payload[2] === 'trade') {
      payload = new KrakenTradeObj(payload[0], payload[1], payload[2], payload[3])
    }

    this.switchForKrakenMessage(payload, data)
  }

  private switchForKrakenMessage(payload: KrakenMessages, data: RawData) {
    switch (payload.event) {
      case 'systemStatus': {
        const status: KrakenSystemStatus = JSON.parse(`${data}`)
        logger.info(`[KrakenWsClient] operation=onSocketMessage; status=${status.status}`)
        break;
      }
      case 'subscriptionStatus': {
        const subs: krakenSubscription = JSON.parse(`${data}`)
        // Kraken Websocket does not send error message in case that the pair or channel does not exist
        logger.info(`[KrakenWsClient] operation=onSocketMessage; msg='Subscriptions successful' channels=${subs.subscription.name}; pair=${subs.pair}`)
        break;
      }
      case 'trade': {
        this.priceStorage.addPrice(
          PairsConverter.convert(payload.pair), ExchangeHouses.Kraken, parseFloat(payload.array[0][0]))
        this.msgProcessor.incrementKrakenTrade()
        break;
      }
      default:
        logger.warn(`[KrakenWsClient] operation=onSocketMessage; msg='event ignored'; data=${data}`)
    }
  }
}
