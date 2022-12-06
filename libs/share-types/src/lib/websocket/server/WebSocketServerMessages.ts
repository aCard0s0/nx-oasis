import {MarketFeed} from "../../core/service/MarketFeed";

export type WebSocketServerMessages = Echo | SystemNotice | MarketFeed

export interface Echo {
  event: 'echo'
}

export interface SystemNotice {
  event: 'systemNotice',
  contents: string
}

