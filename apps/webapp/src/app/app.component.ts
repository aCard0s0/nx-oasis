import {Component, OnInit} from '@angular/core';
import {MarketFeedService} from "./services/market-feed.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SystemNotice} from "@oasis/share-types";

@Component({
  selector: 'oasis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private marketFeedService: MarketFeedService, private snackbar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.marketFeedService.systemNotice$.subscribe(notice => this.onSystemNotice(notice))
  }

  onSystemNotice(notice: SystemNotice) {
    this.snackbar.open(notice.contents, undefined, { duration: 5000})
  }

}
