import {CronJob} from "cron";
import {PriceStorage} from "../PriceStorage";

export const PriceCheckerCronJob  = new CronJob('*/20 * * * * *', () => {
  console.log('Every 10 second:', new Date());
  const prices = PriceStorage.getInstance()
  prices.tmp_print()
});
