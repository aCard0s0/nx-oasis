import {Component, OnInit} from '@angular/core';
import {MarketFeedService} from "../../services/market-feed.service";
import {PriceDiff} from "@oasis/share-types";

@Component({
  selector: 'oasis-price-diff',
  templateUrl: './price-diff.component.html',
  styleUrls: ['./price-diff.component.scss'],
})
export class PriceDiffComponent implements OnInit {
  priceDiff: PriceDiff | undefined

  constructor(private marketFeedService: MarketFeedService) {
  }

  ngOnInit(): void {
    this.marketFeedService.priceDiffNotice$.subscribe(priceDiff => this.updatePriceDiff(priceDiff))
  }

  private updatePriceDiff(priceDiff: PriceDiff) {
    this.priceDiff = priceDiff
    console.log(priceDiff)
  }
}
