#!/usr/bin/env node
import { parse } from "args-any";
import { table } from "table";
// import { get } from "./get";
import { execute } from "../../../ssh";
import { merlinCommand } from "../../../../models/command";

const description = "lists nvram config";
const hint = "[-filter.key <key starts with>]";

export { get } from "./get";

export interface NvramQuery {
  key: string;
}

export const list = (query?: Partial<NvramQuery>): string[][] => {
  const stdOut = execute("nvram show", { silent: true }).stdout;

  const keyQuery = query && query.key;

  const result = stdOut
    .split(/\n/)
    .map((x) => x.split("="))
    .filter((x) => x.length === 2)
    .sort();

  return keyQuery ? result.filter((x) => x[0].startsWith(keyQuery)) : result;
};

const run = (...args: string[]) => {
  const query = parse(args, { keyPrefix: "filter" }).asPartial<NvramQuery>();

  const nvramSettings = list(query);

  const tabularSettings = table(nvramSettings, {
    columnDefault: { width: 40 }
  });

  console.log(tabularSettings);
};

export default merlinCommand({ description, hint, run });
