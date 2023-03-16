import {Component, OnInit} from '@angular/core';
import {createChart} from "lightweight-charts";
import {BinanceCandlestick} from "@oasis/share-types";

@Component({
  selector: 'oasis-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {

  private chartProperties = {
    width:1500,
    height:600,
    timeScale:{
      timeVisible:true,
      secondsVisible:false,
    }
  }

  ngOnInit(): void {
    const domElement = document.getElementById('tvchart') ;
    const chart = createChart(domElement != null ? domElement : "", this.chartProperties);
    const candleSeries = chart.addCandlestickSeries();

    fetch(`http://localhost:8080/binance/candlestick/BTCEUR/1h`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const tvData = data.map( (d: BinanceCandlestick) => {
          return {
            time: d.OpenTime/1000,
            open:parseFloat(d.OpenPrice),
            high:parseFloat(d.HighPrice),
            low:parseFloat(d.LowPrice),
            close:parseFloat(d.ClosePrice)
          }
        });

        candleSeries.setData(tvData);
      })
      .catch(err => console.log(err))
  }


}
