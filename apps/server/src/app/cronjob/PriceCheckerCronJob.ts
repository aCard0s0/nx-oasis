import {CronJob} from "cron";
import {MarketStorage} from "../core/MarketStorage";

export const PriceCheckerCronJob  = new CronJob('*/20 * * * * *', () => {
  console.log('Every 20 second:', new Date());
  const prices = MarketStorage.getInstance()
  prices.tmp_print()
});
