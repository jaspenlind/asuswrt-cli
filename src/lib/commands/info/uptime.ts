#!/usr/bin/env node
import { execute } from "../../ssh";
import { merlinCommand } from "../../../models/command";

const description = "Display router uptime";

const run = (): void => {
  execute("uptime");
};

export default merlinCommand({ description, run });
