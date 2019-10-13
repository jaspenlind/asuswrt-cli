#!/usr/bin/env node
import ssh from "../../ssh";
import { merlinCommand } from "../../../models/command";

const description = "Display router uptime";

const run = (): void => {
  ssh.execute("uptime");
};

export default merlinCommand({ description, run });
