#!/usr/bin/env node

import ssh from "../../../ssh";

import { merlinCommand } from "../../../../models/command";

const description = "Displays nat configuration";

const get = (key: string): string =>
  ssh.execute(`nvram get ${key}`, { silent: true }).stdout;

const run = () => {
  const enabled = get("vts_enable_x") === "1";

  console.log(`Enabled: ${enabled}`);
};

export default merlinCommand({ description, run });
