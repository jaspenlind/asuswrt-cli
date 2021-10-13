#!/usr/bin/env node
import { merlinCommand } from "../../../models/command";
import { execute } from "../../ssh";

const description = "Display router uptime";

const run = (): void => {
  execute("uptime");
};

export default merlinCommand({ description, run });
