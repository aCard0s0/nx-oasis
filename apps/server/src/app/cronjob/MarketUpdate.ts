import {CronJob} from "cron";
import {MarketStorage} from "../core/market/MarketStorage";

export const MarketUpdate  = new CronJob('*/3 * * * * *', () => {
  const market = MarketStorage.getInstance();
  market.sendMarketSnapshot()
  market.calculateDiff()
});
