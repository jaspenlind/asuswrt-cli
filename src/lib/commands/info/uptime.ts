#!/usr/bin/env node
import ssh from "../../ssh";
import { create } from "../../../types/Command";

const description = "Display router uptime";

const run = (): void => {
  ssh.execute("uptime");
};

export default create({ description, run });
