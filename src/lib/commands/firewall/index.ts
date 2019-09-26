#!/usr/bin/env node
import { create } from "../../../types/Command";
import ssh from "../../ssh";

const description = "Opens the Skynet firewall with (optional) arguments";

const helpName = "firewall [args]";

const run = (...args: string[]): void => {
  const firewallArgs = args.join(" ");
  const interactive = firewallArgs === "";

  const command = "sh /jffs/scripts/firewall";

  if (interactive) {
    ssh.executeInTerminal(command);
  } else {
    ssh.execute(`${command} ${firewallArgs}`);
  }
};

export default create({ description, helpName, run });
