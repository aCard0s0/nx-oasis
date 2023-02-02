import {BinanceHttpClient} from "../../http/BinanceHttpClient";

export default async () => {
  const httpClient = new BinanceHttpClient();
  await httpClient.getBinancePairsDetails();

}
