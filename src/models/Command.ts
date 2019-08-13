#!/usr/bin/env node
export default interface Command {
  name: string;
  fullname: string;
  run: any;
  helpname: string;
  description: string;
  args?: string[];
  subCommands: Command[];
}
