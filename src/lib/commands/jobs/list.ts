import { table } from "table";
import { create } from "../../../models/command";
import { ScheduledItem } from "../../../types";
import { isEmpty } from "../../helpers/array.helpers";
import { tryParseExpression } from "../../helpers/cron.helpers";
import { parse } from "../../parsers/scheduled-item.parser";
import { createSSH } from "../../ssh";

const description = "Lists existing cron jobs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asTabular = (data: ScheduledItem[]): any[] => {
  if (isEmpty(data)) return [];

  const tableValues = data.map((x) => {
    const { expression } = tryParseExpression(x.cronExpression);

    const values = Object.values(x);

    values.push(expression?.hasNext() ? expression?.next() : "");

    return values;
  });

  const headings = Object.getOwnPropertyNames(data[0]);

  headings.push("next run");

  tableValues.unshift(headings);

  return tableValues;
};

const getJobList = () => {
  const ssh = createSSH();

  return new Promise<string>((resolve, reject) => {
    ssh.exec("cru l", { out: (stdOut) => resolve(stdOut), err: (stdErr) => reject(stdErr) }).start();
  });
};

const run = async () => {
  const result = await getJobList();

  const parsed = result
    .split("\n")
    .map(parse)
    .filter((x) => x.id);

  console.log(table(asTabular(parsed)));
};

export default create({ description, run });
