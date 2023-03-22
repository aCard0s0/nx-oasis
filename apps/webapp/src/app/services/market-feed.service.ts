import { Injectable } from '@angular/core';
import {Market, MarketFeed, PriceDiff, SystemNotice, Trade, BinanceMiniTicker} from "@oasis/share-types";
import {Subject} from "rxjs";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class MarketFeedService {
  socket: WebSocketSubject<MarketFeed> | undefined
  systemNotice$ = new Subject<SystemNotice>()
  marketNotice$ = new Subject<Market>()
  tradeNotice$ = new Subject<Trade>()
  priceDiffNotice$ = new Subject<PriceDiff>()
  marketUpdate$ = new Subject<BinanceMiniTicker[]>()

  connect(name:string) {
    console.log(`Connecting to ${name} websockets`)
    this.socket = webSocket(`ws://localhost:8080/websockets?name=${name}`)
    const subscription = this.socket.subscribe(message => this.onMessageFromServer(message))
    console.log(`Start consuming messages from websocket: ${name}`)
    return subscription;
  }

  onMessageFromServer(message: MarketFeed) {
    switch (message.event) {
      /*case "systemNotice": {
        console.log("From server: ", message)
        this.systemNotice$.next(message)
        break;
      }*/
      case 'market': {
        this.marketNotice$.next(message)
        break;
      }
      case 'trade': {
        //console.log("From server: ", message)
        //this.tradeNotice$.next(message)
        break;
      }
      case 'priceDiff': {
        this.priceDiffNotice$.next(message)
        break;
      }
      case 'binanceAllMarketUpdate': {
        this.marketUpdate$.next(message.content)
        break;
      }
    }
  }
}
