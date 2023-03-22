import {Component, OnDestroy, OnInit} from '@angular/core';
import {createChart, ISeriesApi, UTCTimestamp} from "lightweight-charts";
import {
  BinanceCandlestick,
  BinanceMiniTicker,
  ExchangeHouses,
  Intervals,
  Pairs,
  PairsConverter
} from "@oasis/share-types";

import {MarketOptionsDropdownService} from "../../../services/market-options-dropdown.service";
import {CandlestickApiService} from "../../../services/candlestick-api.service";
import {Subscription} from "rxjs";
import {WebSocketService} from "../../../services/web-socket.service";

@Component({
  selector: 'oasis-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit, OnDestroy {

  exchanges: ExchangeHouses[] = [];
  pairs: Pairs[] = [];
  intervals: Intervals[] = [];
  selectedExchange: ExchangeHouses = this.exchanges[0];
  selectedPair: Pairs = this.pairs[0];
  selectedInterval: Intervals = this.intervals[0];
  private candleSeries!: ISeriesApi<"Candlestick">;
  private subscription!: Subscription;
  private lastPrice: number | undefined;


  private chartProperties = {
    width: 1500,
    height: 600,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    }
  }

  constructor(
    private marketOptionsService: MarketOptionsDropdownService,
    private webSocketService: WebSocketService,
    private candelstickService: CandlestickApiService) {
  }

  ngOnInit(): void {
    // get options
    this.exchanges = this.marketOptionsService.getExchangeHouses();
    this.pairs = this.marketOptionsService.getPairs();
    this.intervals = this.marketOptionsService.getIntervals();
    this.selectedExchange = this.exchanges[0];
    this.selectedPair = this.pairs[0];
    this.selectedInterval = this.intervals[0];

    // build chart
    this.buildFetchOHLCChart();

    // subscribe binance socket
    this.subscribeWebsocketFeed();
  }

  ngOnDestroy(): void {
    this.unsubscribeWebsocketFeed();
  }

  private buildFetchOHLCChart() {
    const domElement = document.getElementById('tvchart');
    const chart = createChart(domElement != null ? domElement : "", this.chartProperties);
    this.candleSeries = chart.addCandlestickSeries();
    const url = `http://localhost:8080/`
      + `${this.selectedExchange.toLowerCase()}/`
      + `candlestick/`
      + `${this.selectedPair.toLowerCase()}/`
      + `${this.selectedInterval.toLowerCase()}`

    this.candelstickService.fetchOHLCCandles(url)
      .subscribe(data => {
        const tvData = data.map((d: BinanceCandlestick) => {
          return {
            time: (d.OpenTime/1000) as UTCTimestamp,
            open:parseFloat(d.OpenPrice),
            high:parseFloat(d.HighPrice),
            low:parseFloat(d.LowPrice),
            close:parseFloat(d.ClosePrice)
          }
        });
        this.candleSeries.setData(tvData)
      });


  }

  private subscribeWebsocketFeed() {
    //this.marketFeedService.marketUpdate$.subscribe(markets => {this.onLastPrice(markets)})
    //this.subscription = this.marketFeedService.connect(this.selectedExchange.toLowerCase())
    const url = `ws://localhost:8080/websockets?name=${this.selectedExchange.toLowerCase()}`
    const observable = this.webSocketService.connect<BinanceCandlestick>(url, "tv");
    this.subscription = observable.subscribe({
      next: (d) => {
        console.log(d)
        const tvData = {
          time: (d.OpenTime/1000) as UTCTimestamp,
          open:parseFloat(d.OpenPrice),
          high:parseFloat(d.HighPrice),
          low:parseFloat(d.LowPrice),
          close:parseFloat(d.ClosePrice)
        }
        this.candleSeries.update(tvData)
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('WebSocket connection closed.');
      }
    });
  }

  private onLastPrice(marketsUpdate: BinanceMiniTicker[]) {
    marketsUpdate.forEach((ticker) => {
      if (PairsConverter.convertToPairEnum(ticker.s) === this.selectedPair) {
        this.lastPrice = parseFloat(ticker.c);
        console.log(this.lastPrice)
        //this.candleSeries.update(this.lastPrice)
      }
    })
  }

  private unsubscribeWebsocketFeed() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.webSocketService.disconnect('tv')
    }
  }

  exchangeChanged(): void {
    this.buildFetchOHLCChart();
    this.subscribeWebsocketFeed();
  }

  pairChanged(): void {
    this.buildFetchOHLCChart();
    this.subscribeWebsocketFeed();
  }

  intervalChanged(): void {
    this.buildFetchOHLCChart();
    this.subscribeWebsocketFeed();
  }

}
