#!/usr/bin/env node
import ssh from "../../ssh";

const firewall = (args: string[]): void => {
  const firewallArgs = (args || []).join(" ");
  const interactive = firewallArgs === "";

  const command = "sh /jffs/scripts/firewall";

  if (interactive) {
    ssh.executeInTerminal(command);
  } else {
    ssh.execute(`${command} ${firewallArgs}`);
  }
};

export default {
  run: firewall,
  helpname: "firewall [args]",
  description: "Opens the Skynet firewall with the passes args (optional)"
};
