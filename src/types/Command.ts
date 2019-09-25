#!/usr/bin/env node
import { CommandDeclaration } from ".";

export default interface Command extends Required<CommandDeclaration> {
  args: string[];
  fullName: string;
  name: string;
  subCommands: Command[];
}
