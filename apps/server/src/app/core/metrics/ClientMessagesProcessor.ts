import logger from "../../configs/Logger";

export class ClientMessagesProcessor {
  private static instance: ClientMessagesProcessor
  private binanceAggTrade: number
  private binanceMiniTicker: number
  private binanceAllMarketUpdate: number
  private krakenTrade: number
  private coinbaseTrade: number

  public static getInstance(): ClientMessagesProcessor {
    if(!ClientMessagesProcessor.instance) {
      return ClientMessagesProcessor.instance = new ClientMessagesProcessor();
    }
    return ClientMessagesProcessor.instance;
  }

  constructor() {
    this.reset()
  }

  private reset() {
    this.binanceAggTrade = 0
    this.binanceMiniTicker = 0
    this.binanceAllMarketUpdate = 0
    this.krakenTrade = 0
    this.coinbaseTrade = 0
  }

  incrementBinanceAggTrade() {
    this.binanceAggTrade += 1
  }

  incrementKrakenTrade() {
    this.krakenTrade += 1
  }

  incrementCoinbaseTrade() {
    this.coinbaseTrade += 1
  }

  consumedMessagesStatistics() {
    logger.info(`[ClientMessagesProcessor] operation=consumedMessagesStatistics; BinanceAggTrade=${this.binanceAggTrade}; BinanceMiniTicker=${this.binanceMiniTicker}; binanceAllMarketUpdate=${this.binanceAllMarketUpdate}`)
    logger.info(`[ClientMessagesProcessor] operation=consumedMessagesStatistics; Kraken=${this.krakenTrade}; Coinbase=${this.coinbaseTrade}`)
    this.reset()
  }

  incrementBinanceMiniTicker() {
    this.binanceMiniTicker++;
  }

  incrementAllMarketUpdate() {
    this.binanceAllMarketUpdate++;
  }
}
