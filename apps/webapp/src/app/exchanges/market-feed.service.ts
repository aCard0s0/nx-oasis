import { Injectable } from '@angular/core';
import {Market, SystemNotice, Trade, WssMessage} from "@oasis/share-types";
import {Subject} from "rxjs";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class MarketFeedService {
  socket: WebSocketSubject<WssMessage>
  systemNotice$ = new Subject<SystemNotice>()
  tradeNotice$ = new Subject<Trade>()
  marketNotice$ = new Subject<Market>()

  constructor() {
    this.socket = webSocket(`ws://localhost:8080/websockets`)
  }

  connect(name:string) {
    this.socket.subscribe(message => this.onMessageFromServer(message))
  }

  onMessageFromServer(message: WssMessage) {
    console.log("From server: ", message)
    switch (message.event) {
      case "systemNotice": {
        this.systemNotice$.next(message)
        break;
      }
      case 'market': {
        this.marketNotice$.next(message)
        break;
      }
      case 'trade': {
        this.tradeNotice$.next(message)
        break;
      }
    }
  }
}
