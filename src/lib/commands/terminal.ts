#!/usr/bin/env node
import ssh from "../ssh";
import { Command } from "../../types";
import helper from "../commandHelper";

const terminal: Command = helper.create({
  run: (...args: string[]) => {
    ssh.executeInTerminal(args);
  }
});

export default terminal;

// export default class Terminal extends EmptyCommand {
//   public run(...args: string[]) {
//     ssh.executeInTerminal(args);
//   }
// }
