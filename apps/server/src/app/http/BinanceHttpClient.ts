import fetch from "node-fetch";
import {BinancePairsDetails} from "../core/exchange/binance/BinancePairsDetails";

export class BinanceHttpClient {

  private pairsSet = BinancePairsDetails.getInstance()

  async getBinancePairsDetails() {
    const url = 'https://api.binance.com/api/v3/exchangeInfo'
    const response = await fetch(url) //.then(data => {return data})
    const data = await response.json();

    try {
      this.checkStatus(response)

    } catch (error) {
      console.error("Error", error);
      //const errorBody = await error.response.text();
      //console.error(`Error body: ${errorBody}`);
    }

    data.symbols.forEach(pairInfo => {
      this.pairsSet.add(pairInfo)
    })

  }

  checkStatus(response) {
      if (response.ok) {
        return response;  // response.status >= 200 && response.status < 300
      } else {
        throw new HTTPResponseError(response);
      }
  }

}

class HTTPResponseError extends Error {
  private response: string;
  constructor(response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}


