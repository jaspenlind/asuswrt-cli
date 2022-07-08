#!/usr/bin/env node
import { merlinCommand } from "../../../models/command.mjs";
import { execute } from "../../ssh/index.mjs";

const description = "Display router uptime";

const run = (): void => {
  execute("uptime");
};

export default merlinCommand({ description, run });
