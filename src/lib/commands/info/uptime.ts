#!/usr/bin/env node
import ssh from "../../ssh";
import { command } from "../../../types/Command";

const description = "Display router uptime";

const run = (): void => {
  ssh.execute("uptime");
};

export default command({ description, run });
