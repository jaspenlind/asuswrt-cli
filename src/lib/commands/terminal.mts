#!/usr/bin/env node
import { create } from "../../models/command.mjs";
import { executeInTerminal } from "../ssh/index.mjs";

const description = "Opens an ssh connection to the router and executes the args (optional)";

const run = (...args: string[]) => {
  executeInTerminal(args);
};

export default create({ description, run });
