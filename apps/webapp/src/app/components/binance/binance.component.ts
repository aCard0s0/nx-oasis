import {Component, OnInit} from '@angular/core';
import {MarketFeedService} from "../../services/market-feed.service";
import {BinanceMiniTicker} from "@oasis/share-types";

@Component({
  selector: 'oasis-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.scss'],
})
export class BinanceComponent implements OnInit {

  private markets: Map<string, number>;

  constructor(private marketFeedService: MarketFeedService) {
    this.markets = new Map<string, number>();
  }

  ngOnInit(): void {
    this.marketFeedService.marketUpdate$.subscribe(markets => {this.updateMarketsView(markets)})
    this.connect('binance')
  }

  connect(socketNameInput: string) {
    this.marketFeedService.connect(socketNameInput)
  }

  private updateMarketsView(marketsUpdate: BinanceMiniTicker[]) {
    marketsUpdate.forEach((ticker) => {
      this.markets.set(ticker.s, parseFloat(ticker.c))
    })
  }

  getMarketPrices() {
    return this.markets;
  }
}
