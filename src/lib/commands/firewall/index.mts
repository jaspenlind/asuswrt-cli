#!/usr/bin/env node

import { create } from "../../../models/command.mjs";
import { execute, executeInTerminal } from "../../ssh/index.mjs";

const description = "Opens the Skynet firewall with (optional) arguments";

const helpName = "firewall [args]";

const run = (...args: string[]): void => {
  const firewallArgs = args.join(" ");
  const interactive = firewallArgs === "";

  const firewallCommand = "sh /jffs/scripts/firewall";
  if (interactive) {
    executeInTerminal(firewallCommand);
  } else {
    execute(`${firewallCommand} ${firewallArgs}`);
  }
};

export default create({ description, helpName, run });
