import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MarketFeedService } from './services/market-feed.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MarketPriceComponent } from './components/markets-view/market-panel/market-price.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TradePanelComponent } from './components/trade-panel/trade-panel.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PriceDiffComponent } from './components/markets-view/price-diff/price-diff.component';
import { MarketsViewComponent } from './components/markets-view/markets-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketPriceComponent,
    TradePanelComponent,
    PriceDiffComponent,
    MarketsViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [MarketFeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
