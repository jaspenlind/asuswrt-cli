#!/usr/bin/env node
import ssh from "../../ssh";

const uptime = (): void => {
  ssh.execute("uptime");
};

export default {
  run: uptime,
  description: "Display router uptime"
};
