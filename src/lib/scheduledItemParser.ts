import { ScheduledItem } from "../types";
import { takeWhile, takeWhileAll } from "./arrayHelper";

const idMarker = "#";

const parseCronExpression = (row: string[]): [string, string[]] => {
  const result = takeWhileAll(row, x => x.filter(z => z === " ").length < 5);
  const remainder = row.slice(result.length + 1);

  return [result.join("").trim(), remainder];
};

const parseCommand = (row: string[]): [string, string[]] => {
  const result = takeWhile(row, x => x !== idMarker);
  const remainder = row.slice(result.length + 1);

  return [result.join("").trim(), remainder];
};

const parseId = (row: string[]): string => {
  return row
    .join("")
    .replace(new RegExp(`${idMarker}`, "g"), "")
    .trim();
};

export const parse = (row: string): ScheduledItem => {
  const [cronExpression, cronRemainder] = parseCronExpression([...row]);
  const [command, commandRemainder] = parseCommand(cronRemainder);
  const id = parseId(commandRemainder);

  const item: ScheduledItem = {
    id,
    command,
    cronExpression
  };

  return item;
};
