import { Injectable } from '@angular/core';
import {Market, MarketFeed, PriceDiff, SystemNotice, Trade} from "@oasis/share-types";
import {Subject} from "rxjs";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class MarketFeedService {
  socket: WebSocketSubject<MarketFeed>
  systemNotice$ = new Subject<SystemNotice>()
  marketNotice$ = new Subject<Market>()
  tradeNotice$ = new Subject<Trade>()
  priceDiffNotice$ = new Subject<PriceDiff>()

  constructor() {
    this.socket = webSocket(`ws://localhost:8080/websockets`)
  }

  connect(name:string) {
    this.socket.subscribe(message => this.onMessageFromServer(message))
  }

  onMessageFromServer(message: MarketFeed) {
    switch (message.event) {
      /*case "systemNotice": {
        console.log("From server: ", message)
        this.systemNotice$.next(message)
        break;
      }*/
      case 'market': {
        console.log("From server: ", message)
        this.marketNotice$.next(message)
        break;
      }
      case 'trade': {
        //console.log("From server: ", message)
        //this.tradeNotice$.next(message)
        break;
      }
      case 'priceDiff': {
        console.log("From server: ", message)
        this.priceDiffNotice$.next(message)
        break;
      }
    }
  }
}
