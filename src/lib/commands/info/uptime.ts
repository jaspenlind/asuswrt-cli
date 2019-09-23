#!/usr/bin/env node
import ssh from "../../ssh";

const uptime = (): void => {
  ssh.execute("uptime");
};

export default {
  description: "Display router uptime",
  run: uptime
};
