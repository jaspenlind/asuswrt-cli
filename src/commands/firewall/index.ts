#!/usr/bin/env node
import ssh from "../../common/ssh";

const firewall = (args: string[]): void => {
  ssh.execute(`sh /jffs/scripts/firewall ${args.join(" ")}`);
};

export default {
  run: firewall,
  helpname: "firewall [args]",
  description: "Opens the Skynet firewall with the passes args (optional)"
};
