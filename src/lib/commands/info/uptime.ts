#!/usr/bin/env node
import ssh from "../../ssh";
import helper from "../../commandHelper";

const run = (): void => {
  ssh.execute("uptime");
};

const description = "Display router uptime";

export default helper.create({ description, run });
