import { KrakenTrade, TradeDetails } from './KrakenMessages';

export class KrakenTradeObj implements KrakenTrade {
  channelID: number;
  array: TradeDetails[];
  event: string;
  pair: string;

  constructor(channelID: any, array: any[], event: any, pair: any) {
    this.channelID = channelID;
    this.array = array;
    this.event = event;
    this.pair = pair;
  }
}
