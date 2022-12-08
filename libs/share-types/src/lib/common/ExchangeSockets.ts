import {BinanceSubscribeRequest, BinanceUnsubscribeRequest} from "../binance/BinanceRequests";
import {KrakenSubscribeRequest, KrakenUnsubscribeRequest} from "../kraken/KrakenRequests";
import {CoinbaseSubscribeRequest, CoinbaseUnsubscribeRequest} from "../coinbase/CoinbaseRequests";

export type SubscribeRequest = BinanceSubscribeRequest | KrakenSubscribeRequest | CoinbaseSubscribeRequest
export type UnsubscribeRequest = BinanceUnsubscribeRequest | KrakenUnsubscribeRequest | CoinbaseUnsubscribeRequest

export enum ExchangeSockets {
  Binance = 'wss://stream.binance.com:9443/ws',
  Kraken = 'wss://ws.kraken.com',
  Coinbase = 'wss://ws-feed.exchange.coinbase.com'
}
