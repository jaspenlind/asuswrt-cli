#!/usr/bin/env node
import ssh from "../ssh";
import { create } from "../../types/Command";

const description =
  "Opens an ssh connection to the router and executes the args (optional)";

const run = (...args: string[]) => {
  ssh.executeInTerminal(args);
};

export default create({ description, run });
