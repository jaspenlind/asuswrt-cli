#!/usr/bin/env node

import { create } from "../../../models/command";
import { execute, executeInTerminal } from "../../ssh";

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
