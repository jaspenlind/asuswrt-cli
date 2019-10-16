import { StringComparison } from "../types";
import { create, empty, ParseResult } from "../types/ParseResult";
import { parse } from "./enumHelper";
import { swap } from "./mapHelper";

export enum CronSchedule {
  Custom,
  Daily,
  Hourly,
  Monthly,
  Weekly,
  Yearly
}

const cronScheduleToTab = new Map<CronSchedule, string>([
  [CronSchedule.Daily, "0 0 * * *"],
  [CronSchedule.Hourly, "0 * * * *"],
  [CronSchedule.Monthly, "0 0 1 * *"],
  [CronSchedule.Weekly, "0 0 * * 0"],
  [CronSchedule.Yearly, "0 0 1 1 *"]
]);

const cronTabToSchedule = swap(cronScheduleToTab);

export const parseSchedule = (cronTab: string): ParseResult<CronSchedule> =>
  create(cronTabToSchedule.get(cronTab));

export const parseCronTab = (
  schedule: CronSchedule | string
): ParseResult<string> => {
  const key =
    typeof schedule === "string"
      ? parse(CronSchedule, schedule, StringComparison.OrdinalIgnoreCase).value
      : schedule;

  const value = (key && cronScheduleToTab.get(key)) || undefined;

  return create(value);
};
