import { Request, Response} from "express"
import { Router } from 'express';
import {binanceCandlestickRoute} from "./binance/BinanceCandlestick";
export const binanceRoute = Router();

binanceRoute.use(binanceCandlestickRoute);

/*binanceRoute.use((req, res, next) => {
  console.log('Time: ', Date.now())
  // add motoring metric
  next()
})*/

binanceRoute.get('/', (req: Request, res: Response) => {
  console.log(req.query)
  res.send('GET request to Binance API')
})
binanceRoute.get('/*', (req: Request, res: Response) => {
  console.log(req.params[0])
  res.send('GET request to Binance API')
})

binanceRoute.post('/', (req: Request, res) => {
  console.log(req)
  res.send('POST request to Binance API');
})
binanceRoute.put('/', (req: Request, res: Response) => {
  res.send('PUT request to Binance API');
})
binanceRoute.delete('/', (req: Request, res: Response) => {
  res.send('DELETE request to Binance API');
})

