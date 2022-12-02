import {CronJob} from "cron";
import {MarketStorage} from "../core/MarketStorage";

export const PriceCheckerCronJob  = new CronJob('*/20 * * * * *', () => {
  MarketStorage.getInstance().sendMarketSnapshot()
});
