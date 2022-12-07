import {Component, OnInit} from '@angular/core';
import {Market} from "@oasis/share-types";
import {MarketFeedService} from "../../../services/market-feed.service";

@Component({
  selector: 'oasis-market-panel',
  templateUrl: './market-price.component.html',
  styleUrls: ['./market-price.component.scss'],
})
export class MarketPriceComponent implements OnInit {
  priceFeed: Map<string, Market>;

  constructor(private marketFeedService: MarketFeedService) {
    this.priceFeed = new Map<string, Market>();
  }

  ngOnInit(): void {
    this.marketFeedService.marketNotice$.subscribe(marketMsg => this.updatePanel(marketMsg))
  }

  private updatePanel(market: Market) {
    this.priceFeed.set(market.pair, market)
  }

  marketFeedPairs() {
    return Array.from(this.priceFeed.keys());
  }

  getExchangesFor(pair: string) {
    return this.priceFeed.get(pair)?.exchanges
  }
}
