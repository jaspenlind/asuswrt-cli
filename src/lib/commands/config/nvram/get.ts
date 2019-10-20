#!/usr/bin/env node
import optionParser from "option-parser";
import promptly from "promptly";
import ssh from "../../../ssh";
import { merlinCommand } from "../../../../models/command";

const description = "Fetches a nvram config setting";
const hint = "[-key <name of nvram key to fetch>";

export const get = (key: string): string =>
  ssh.execute(`nvram get ${key}`, { silent: true }).stdout;

const run = async (...args: string[]) => {
  const typedArgs = optionParser.parse(args);

  const key =
    typedArgs.get("key") || (await promptly.prompt("Enter nvram key to get:"));

  console.log(get(key));
};

export default merlinCommand({ description, hint, run });
