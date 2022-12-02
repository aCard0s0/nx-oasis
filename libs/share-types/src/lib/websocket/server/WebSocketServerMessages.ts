import {MarketFeed} from "../../core/service/MarketFeed";

export type WebSocketServerMessages = SystemNotice | MarketFeed

export interface SystemNotice {
  event: "systemNotice",
  contents: string
}
