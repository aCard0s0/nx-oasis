import {CronJob} from "cron";
import {ClientMessagesProcessor} from "../core/metrics/ClientMessagesProcessor";

export const ClientMessagesLogger  = new CronJob('1 * * * * *', () => {
  const processor = ClientMessagesProcessor.getInstance();
  processor.consumedMessagesStatistics()
});
