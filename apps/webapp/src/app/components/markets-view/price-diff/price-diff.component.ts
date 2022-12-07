import {Component, OnInit} from '@angular/core';
import {MarketFeedService} from "../../../services/market-feed.service";
import {PriceDiff} from "@oasis/share-types";

@Component({
  selector: 'oasis-price-diff',
  templateUrl: './price-diff.component.html',
  styleUrls: ['./price-diff.component.scss'],
})
export class PriceDiffComponent implements OnInit {
  diffFeed: Map<string, PriceDiff>;

  constructor(private marketFeedService: MarketFeedService) {
    this.diffFeed = new Map<string, PriceDiff>();
  }

  ngOnInit(): void {
    this.marketFeedService.priceDiffNotice$.subscribe(priceDiff => this.updatePriceDiff(priceDiff))
  }

  private updatePriceDiff(priceDiff: PriceDiff) {
    this.diffFeed.set(priceDiff.pair, priceDiff)
  }

  priceDiffFeedPairs() {
    return Array.from(this.diffFeed.keys());
  }

  getPriceDiffDetailsFor(pair: string) {
    return this.diffFeed.get(pair)?.priceDiffDetails
  }
}
