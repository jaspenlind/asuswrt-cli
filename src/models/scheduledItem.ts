import { ScheduledItem } from "../types";

export const empty: ScheduledItem = {
  id: "empty",
  cronExpression: "* * * * *",
  command: ""
};
