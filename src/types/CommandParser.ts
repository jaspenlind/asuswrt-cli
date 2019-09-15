#!/usr/bin/env node
import { Command } from ".";

export interface CommandParser {
  all(): Command[];
  find(args: string[]): Command | null;
  isHelp: boolean;
  isDebug: boolean;
}