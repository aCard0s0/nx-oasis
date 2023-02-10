import {Request, Response, Router} from "express";
import fetch from "node-fetch";
import {BinanceCandlestick} from "@oasis/share-types";
import {fetchData} from "../../http/HttpClient";


export const binanceCandlestickRoute = Router();

binanceCandlestickRoute.get('/candlestick/:symbol/:interval', async (req: Request, res: Response) => {
  const symbol = req.params.symbol;
  const interval = req.params.interval;

  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1000`

  try {
    const data = await getBinanceCandleStick(url);
    return res.json(data);

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
});

async function getBinanceCandleStick(url: string): Promise<BinanceCandlestick[]> {
  const data = await fetchData(url);
  const response: BinanceCandlestick[] = [];

  data.forEach(candle => response.push({
    OpenTime: candle[0],
    OpenPrice: candle[1],
    HighPrice: candle[2],
    LowPrice: candle[3],
    ClosePrice: candle[4],
    Volume: candle[5],
    CloseTime: candle[6],
    NumberOfTrades: candle[8],
  }));

  return response;
}
