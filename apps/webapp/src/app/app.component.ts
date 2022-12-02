import {Component, OnInit} from '@angular/core';
import {MarketFeedService} from "./exchanges/market-feed.service";
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
  connect(socketNameInput: HTMLInputElement) {
    console.log(`Connecting as ${socketNameInput.value}`)
    this.marketFeedService.connect(socketNameInput.value)
  }

  onSystemNotice(notice: SystemNotice) {
    this.snackbar.open(notice.contents, undefined, { duration: 5000})
  }

}
