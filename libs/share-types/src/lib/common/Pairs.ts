export enum Pairs {
  UNKNOWN = "unknown",
  BTC_EUR = 'BTC-EUR',
  ETH_EUR = 'ETH-EUR',
  ADA_EUR = 'ADA-EUR',
  XRP_EUR = 'XRP-EUR',
}

const UNKNOWN: string[] = []
const BTC_EUR = ['BTCEUR', 'XBT/EUR', 'BTC-EUR']
const ETH_EUR = ['ETHEUR', 'ETH/EUR', 'ETH-EUR']
const ADA_EUR = ['ADAEUR', 'ADA/EUR', 'ADA-EUR']
const XRP_EUR = ['XRPEUR', 'XRP/EUR', 'XRP-EUR']

export class PairsConverter {
  private static tickerToPair = new Map<string[], Pairs>()

  static {
    this.tickerToPair.set(UNKNOWN, Pairs.UNKNOWN)
    this.tickerToPair.set(BTC_EUR, Pairs.BTC_EUR)
    this.tickerToPair.set(ETH_EUR, Pairs.ETH_EUR)
    this.tickerToPair.set(ADA_EUR, Pairs.ADA_EUR)
    this.tickerToPair.set(XRP_EUR, Pairs.XRP_EUR)
  }

  static convertToPairEnum(ticker: string): Pairs {
    const possibleFormats: string[] = Array.from(this.tickerToPair.keys())
      .find(tickers => tickers.includes(ticker)) || [];
    return this.tickerToPair.get(possibleFormats) || Pairs.UNKNOWN;
  }

  static getBinanceTicker(pair: string){
    const possibleFormats: string[] = Array.from(this.tickerToPair.keys())
      .find(tickers => tickers.some(t => t === pair.toUpperCase())) || [];
    return possibleFormats[0];
  }
}
