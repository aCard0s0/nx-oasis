import {BinanceSubscribeRequest, BinanceUnsubscribeRequest} from "./binance/binance-requests";
import {KrakenSubscribeRequest, KrakenUnsubscribeRequest} from "./kraken/kraken-requests";

export type SubscribeRequest = BinanceSubscribeRequest | KrakenSubscribeRequest
export type UnsubscribeRequest = BinanceUnsubscribeRequest | KrakenUnsubscribeRequest

export enum ExchangeSockets {
  Binance = 'wss://stream.binance.com:9443/ws',
  Kraken = 'wss://ws.kraken.com'
}
