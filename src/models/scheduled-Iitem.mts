import { ScheduledItem } from "../types/index.mjs";

export const empty: ScheduledItem = {
  id: "empty",
  cronExpression: "* * * * *",
  command: ""
};

export default {
  empty
};
