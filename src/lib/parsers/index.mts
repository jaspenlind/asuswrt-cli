import { all, parse as parseCommand } from "./command.parser.mjs";
import { parse as parseJsonFile } from "./json-file.parser.mjs";
import { parse as parseSchedule } from "./scheduled-item.parser.mjs";

export const command = {
  parse: parseCommand,
  all
};

export const ScheduledItem = {
  parse: parseSchedule
};

export const json = {
  parse: parseJsonFile
};
