import fetch from "node-fetch";
import {BinancePairsDetails} from "../core/exchange/binance/BinancePairsDetails";
import Logger from "../configs/Logger";
import {fetchData} from "./HttpClient";

export class BinanceHttpClient {

  private pairsSet = BinancePairsDetails.getInstance()

  async getBinancePairsDetails() {
    const url = 'https://api.binance.com/api/v3/exchangeInfo'

    try {
      const data = await fetchData(url);

      data.symbols.forEach(pairInfo => {
        this.pairsSet.add(pairInfo)
      })

      Logger.info(`[BinanceHttpClient] operation=getBinancePairsDetails; msg='Loaded ${this.pairsSet.size()} pairs from Binance'`)

    } catch (error) {
      console.error("Error", error);
      //const errorBody = await error.response.text();
      //console.error(`Error body: ${errorBody}`);
    }
  }
}


