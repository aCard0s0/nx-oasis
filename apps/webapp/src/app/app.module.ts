import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarketFeedService } from './services/market-feed.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MarketPanelComponent } from './market-panel/market-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TradePanelComponent } from './trade-panel/trade-panel.component';

@NgModule({
  declarations: [AppComponent, MarketPanelComponent, TradePanelComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
  ],
  providers: [MarketFeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
