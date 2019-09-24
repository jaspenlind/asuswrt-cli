#!/usr/bin/env node
import ssh from "../ssh";
import { CommandDeclaration } from "../../types";

const terminal = (args: string[]): void => {
  ssh.executeInTerminal(args);
};

const declaration: CommandDeclaration = {
  description:
    "Opens an ssh connection to the router and executes the args (optional)",
  helpName: "terminal [args]",
  run: (...args: string[]) => terminal(args)
};

export default declaration;
