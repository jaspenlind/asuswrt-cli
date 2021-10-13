import cron from "cron-parser";
import { table } from "table";
import { create } from "../../../models/command";
import { ScheduledItem } from "../../../types";
import { isEmpty } from "../../helpers/array.helpers";
import { parse } from "../../parsers/scheduled-item.parser";
import { execute } from "../../ssh";

const description = "Lists existing cron jobs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asTabular = (data: ScheduledItem[]): any[] => {
  if (isEmpty(data)) return [];

  const tableValues = data.map((x) => {
    const values = Object.values(x);
    const expression = cron.parseExpression(x.cronExpression);
    values.push(expression.hasNext() ? expression.next() : "");
    return values;
  });

  const headings = Object.getOwnPropertyNames(data[0]);
  headings.push("next run");

  tableValues.unshift(headings);

  return tableValues;
};

const run = () => {
  const result = execute("cru l", { silent: true });

  const parsed = result.stdout
    .split("\n")
    .map((x) => parse(x))
    .filter((x) => x.id);

  const tabularData = asTabular(parsed);
  console.log(parsed);
  console.log(table(tabularData));
};

export default create({ description, run });
