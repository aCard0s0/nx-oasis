import {CronJob} from "cron";
import {MarketStorage} from "../core/MarketStorage";

export const PriceCheckerCronJob  = new CronJob('*/3 * * * * *', () => {
  const market = MarketStorage.getInstance();
  market.sendMarketSnapshot()
  market.calculateDiff()
});
