import {
  parseCronTab,
  parseSchedule,
  CronSchedule
} from "../src/lib/cronParser";

const daily = "0 0 * * *";

describe("cronParser", () => {
  describe("asCronTab", () => {
    it("can parse string", () => {
      expect(parseCronTab("Daily").value).toBe(daily);
      expect(parseCronTab("daily").value).toBe(daily);
    });

    it("can parse cron schedule", () => {
      expect(parseSchedule(daily).value).toBe(CronSchedule.Daily);
    });
  });
});
