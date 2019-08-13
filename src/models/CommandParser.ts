#!/usr/bin/env node
import Command from "./Command";

export default interface CommandParser {
  all(): Command[];
  find(args: string[]): Command;
  isHelp: boolean;
  isDebug: boolean;
}
