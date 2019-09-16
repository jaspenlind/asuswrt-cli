#!/usr/bin/env node
import ssh from "../ssh";

const terminal = (args: string[]): void => {
  ssh.executeInTerminal(args);
};

export default {
  run: terminal,
  helpname: "terminal [args]",
  description:
    "Opens an ssh connection to the router and executes the args (optional)"
};
