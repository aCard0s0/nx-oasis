import {Component, OnInit} from '@angular/core';
import {Market} from "@oasis/share-types";
import {MarketFeedService} from "../services/market-feed.service";

@Component({
  selector: 'oasis-market-panel',
  templateUrl: './market-panel.component.html',
  styleUrls: ['./market-panel.component.scss'],
})
export class MarketPanelComponent implements OnInit {
  panelOpenState = false;
  marketFeed: Market | undefined

  constructor(private marketFeedService: MarketFeedService,) {
  }

  ngOnInit(): void {
    this.marketFeedService.marketNotice$.subscribe(market => this.updatePanel(market))
  }

  private updatePanel(market: Market) {
    this.marketFeed = market
    console.log(this.marketFeed.exchanges[0].name)
    console.log(this.marketFeed.exchanges[0].lastPrice.amount)
    console.log(this.marketFeed.exchanges[0].lastPrice.currency)
    console.log('')
    console.log(market.exchanges[0].name)
    console.log(market.exchanges[0].lastPrice.amount)
    console.log(market.exchanges[0].lastPrice.currency)
  }
}
