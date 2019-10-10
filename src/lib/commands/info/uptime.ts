#!/usr/bin/env node
import ssh from "../../ssh";
import { create } from "../../../models/command";

const description = "Display router uptime";

const run = (): void => {
  ssh.execute("uptime");
};

export default create({ description, run });
