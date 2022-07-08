#!/usr/bin/env node
import { CommandRequirement } from "./CommandRequirement.mjs";

export interface Command {
  description?: string;
  helpName?: string;
  hint?: string;
  requirements: CommandRequirement[];
  run: (...args: string[]) => any;
}
