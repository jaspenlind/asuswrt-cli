#!/usr/bin/env node
export default interface Command {
  args: string[];
  description: string;
  fullName: string;
  helpName: string;
  name: string;
  run: any;
  subCommands: Command[];
  usage: string;
}
