import {BinanceSubscribeRequest, BinanceUnsubscribeRequest} from "../exchanges/binance/BinanceRequests";
import {KrakenSubscribeRequest, KrakenUnsubscribeRequest} from "../exchanges/kraken/KrakenRequests";
import {CoinbaseSubscribeRequest, CoinbaseUnsubscribeRequest} from "../exchanges/coinbase/CoinbaseRequests";

export type SubscribeRequest = BinanceSubscribeRequest | KrakenSubscribeRequest | CoinbaseSubscribeRequest
export type UnsubscribeRequest = BinanceUnsubscribeRequest | KrakenUnsubscribeRequest | CoinbaseUnsubscribeRequest

export enum ExchangeSockets {
  Binance = 'wss://stream.binance.com:9443/ws',
  Kraken = 'wss://ws.kraken.com',
  Coinbase = 'wss://ws-feed.exchange.coinbase.com'
}
