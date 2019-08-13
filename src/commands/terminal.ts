#!/usr/bin/env node
import ssh from "../common/ssh";

const terminal = (args: string[]): void => {
  ssh.execute(args);
};

export default {
  run: terminal,
  helpname: "terminal [args]",
  description:
    "Opens an ssh connection to the router and executes the args (optional)"
};
