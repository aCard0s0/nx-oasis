export enum Pairs {
  BTC_EUR = 'BTC/EUR',
  ETH_EUR = 'ETH/EUR',
  UNKNOWN = "unknown"
}

const UNKNOWN: string[] = []
const BTC_EUR = ['BTCEUR', 'XBT/EUR']
const ETH_EUR = ['ETHEUR', 'ETH/EUR']

export class PairsConverter {
  private static tickerToPair = new Map<string[], Pairs>()

  static {
    this.tickerToPair.set(UNKNOWN, Pairs.UNKNOWN)
    this.tickerToPair.set(BTC_EUR, Pairs.BTC_EUR)
    this.tickerToPair.set(ETH_EUR, Pairs.ETH_EUR)
  }

  static convert(ticker: string): Pairs {
    const possibleFormats: string[] = Array.from(this.tickerToPair.keys())
      .find(tickers => tickers.some(t => t === ticker)) || [];
    return this.tickerToPair.get(possibleFormats) || Pairs.UNKNOWN;
  }
}
