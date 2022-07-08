#!/usr/bin/env node
import { parse } from "args-any";
import promptly from "promptly";
import { merlinCommand } from "../../../../models/command.mjs";
import { execute } from "../../../ssh/index.mjs";

const description = "Fetches a nvram config setting";
const hint = "[-key <name of nvram key to fetch>";

export const get = (key: string): string => execute(`nvram get ${key}`, { silent: true }).stdout;

const run = async (...args: string[]) => {
  const typedArgs = parse(args);
  const option = typedArgs.get("key");

  const key = (option && option.value) || (await promptly.prompt("Enter nvram key to get:"));

  console.log(get(key));
};

export default merlinCommand({ description, hint, run });
