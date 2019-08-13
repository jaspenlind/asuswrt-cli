#!/usr/bin/env node
import ssh from "../../common/ssh";

const uptime = (): void => {
  ssh.execute(["uptime"]);
};

export default {
  run: uptime,
  description: "Display router uptime"
};
