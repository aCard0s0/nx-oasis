import {WebsocketManager} from "../../../app/websockets/clients/WebsocketManager";
import {BinanceSubRequest, BinanceUnsubRequest, ExchangeHouses, KrakenSubTradeRequest} from "@oasis/share-types";
import {BinanceWsClient} from "../../../app/websockets/clients/BinanceWsClient";
import {KrakenWsClient} from "../../../app/websockets/clients/KrakenWsClient";
import {waitForSocketClientState} from "../WebSocketTestUtils";
import {WebSocket} from "ws";

describe('Exchange Manager', () => {
  let exchanges;
  beforeEach(() => {
    exchanges = new WebsocketManager()
  });
  afterEach(() => {
    exchanges.closeAllSockets()
  });

  it('should add entry', async () => {
    const binanceSocket1 = new BinanceWsClient(BinanceSubRequest)
    exchanges.add(ExchangeHouses.Binance, binanceSocket1)
    expect(binanceSocket1.getState()).toEqual(WebSocket.CONNECTING)

    await waitForSocketClientState(binanceSocket1, WebSocket.OPEN)

    const binanceSocket2 = exchanges.get(ExchangeHouses.Binance)
    expect(binanceSocket1).toEqual(binanceSocket2)
    expect(exchanges.size()).toEqual(1)
  });

  it('should remove entry', async () => {
    const binanceSocket1 = new BinanceWsClient(BinanceSubRequest)
    const krakenSocket1 = new KrakenWsClient(KrakenSubTradeRequest)

    exchanges.add(ExchangeHouses.Binance, binanceSocket1)
    exchanges.add(ExchangeHouses.Kraken, krakenSocket1)
    expect(exchanges.size()).toEqual(2)

    await waitForSocketClientState(binanceSocket1, WebSocket.OPEN)
    await waitForSocketClientState(krakenSocket1, WebSocket.OPEN)

    const socket = exchanges.remove(ExchangeHouses.Binance, BinanceUnsubRequest)
    expect(socket).toEqual(binanceSocket1)
    expect(socket.getState()).toEqual(WebSocket.CLOSING)
    expect(exchanges.size()).toEqual(1)
  });
})
