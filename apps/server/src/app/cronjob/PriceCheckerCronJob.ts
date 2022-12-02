import {CronJob} from "cron";
import {MarketStorage} from "../core/MarketStorage";

export const PriceCheckerCronJob  = new CronJob('*/20 * * * * *', () => {
  console.log(new Date(), `Snapshot sent`);
  MarketStorage.getInstance().sendMarketSnapshot()
});
