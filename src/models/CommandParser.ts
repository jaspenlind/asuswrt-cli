#!/usr/bin/env node
import Command from "./Command";

export default interface CommandParser {
  all(): Command[];
  find(args: string[]): Command | null;
  isHelp: boolean;
  isDebug: boolean;
}
