import logger from "../configs/Logger";

export class ClientMessagesProcessor {
  private static instance: ClientMessagesProcessor
  private binanceTrade: number
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
    this.binanceTrade = 0
    this.krakenTrade = 0
    this.coinbaseTrade = 0
  }

  incrementBinanceTrade() {
    this.binanceTrade += 1
  }

  incrementKrakenTrade() {
    this.krakenTrade += 1
  }

  incrementCoinbaseTrade() {
    this.coinbaseTrade += 1
  }

  consumedMessagesStatistics() {
    logger.info(`[ClientMessagesProcessor] operation=consumedMessagesStatistics; Binance=${this.binanceTrade}; Kraken=${this.krakenTrade}; Coinbase=${this.coinbaseTrade}`)
    this.reset()
  }
}
