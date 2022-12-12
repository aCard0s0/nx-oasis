import {Component} from '@angular/core';
import {MarketFeedService} from "../../services/market-feed.service";

@Component({
  selector: 'oasis-markets-view',
  templateUrl: './markets-view.component.html',
  styleUrls: ['./markets-view.component.scss'],
})
export class MarketsViewComponent {

  constructor(private marketFeedService: MarketFeedService) {
  }

  connect(socketNameInput: string) {
    this.marketFeedService.connect(socketNameInput)
  }
}
