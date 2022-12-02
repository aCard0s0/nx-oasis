import {CronJob} from "cron";
import {MarketStorage} from "../core/MarketStorage";
import logger from "../configs/Logger";

export const PriceCheckerCronJob  = new CronJob('*/20 * * * * *', () => {
  logger.info(`[PriceCheckerCronJob] msg='market snapshot sent'`)
  MarketStorage.getInstance().sendMarketSnapshot()
});
