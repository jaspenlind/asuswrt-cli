#!/usr/bin/env node

import { merlinCommand } from "../../../../models/command";
import { execute } from "../../../ssh";

const description = "Displays nat configuration";

const get = (key: string): string => execute(`nvram get ${key}`, { silent: true }).stdout;

const run = () => {
  const enabled = get("vts_enable_x") === "1";

  console.log(`Enabled: ${enabled}`);
};

export default merlinCommand({ description, run });
