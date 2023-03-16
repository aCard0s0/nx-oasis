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
import { MatGridListModule } from '@angular/material/grid-list';
import { PriceDiffComponent } from './components/markets-view/price-diff/price-diff.component';
import { MarketsViewComponent } from './components/markets-view/markets-view.component';
import { RouterModule, Routes } from '@angular/router';
import { BinanceComponent } from './components/binance/binance.component';

import { NgChartsModule } from 'ng2-charts';
import { TvComponent } from './components/charts/tv/tv.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'exchanges', pathMatch: 'full' },
  { path: 'exchanges', component: MarketsViewComponent },
  { path: 'binance', component: BinanceComponent },
  { path: 'tradingview', component: TvComponent },
  //{path: '**', component: NotFoundComponent}    // Has to be the last
];

@NgModule({
  declarations: [
    AppComponent,
    MarketPriceComponent,
    PriceDiffComponent,
    MarketsViewComponent,
    BinanceComponent,
    TvComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule.forRoot(),
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    NgChartsModule,
  ],
  providers: [MarketFeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
