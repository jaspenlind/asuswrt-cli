#!/usr/bin/env node
import { CommandRequirement } from ".";

export default interface Command {
  description?: string;
  helpName?: string;
  hint?: string;
  requirements: CommandRequirement[];
  run: (...args: string[]) => any;
}
