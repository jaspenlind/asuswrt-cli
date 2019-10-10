#!/usr/bin/env node
import { create } from "../../../models/command";
import ssh from "../../ssh";

const description = "Opens the Skynet firewall with (optional) arguments";

const helpName = "firewall [args]";

const run = (...args: string[]): void => {
  const firewallArgs = args.join(" ");
  const interactive = firewallArgs === "";

  const firewallCommand = "sh /jffs/scripts/firewall";

  if (interactive) {
    ssh.executeInTerminal(firewallCommand);
  } else {
    ssh.execute(`${firewallCommand} ${firewallArgs}`);
  }
};

export default create({ description, helpName, run });
