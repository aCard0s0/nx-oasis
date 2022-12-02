import {MarketFeed} from "../service/MarketFeed";

export type WssMessage = SystemNotice | MarketFeed

export interface SystemNotice {
  event: "systemNotice",
  contents: string
}
