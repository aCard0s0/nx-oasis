import {BinanceSubscribeRequest, BinanceUnsubscribeRequest} from "../binance/BinanceRequests";
import {KrakenSubscribeRequest, KrakenUnsubscribeRequest} from "../kraken/KrakenRequests";

export type SubscribeRequest = BinanceSubscribeRequest | KrakenSubscribeRequest
export type UnsubscribeRequest = BinanceUnsubscribeRequest | KrakenUnsubscribeRequest

export enum ExchangeSockets {
  Binance = 'wss://stream.binance.com:9443/ws',
  Kraken = 'wss://ws.kraken.com'
}
