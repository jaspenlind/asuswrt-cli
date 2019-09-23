#!/usr/bin/env node
import { Command } from ".";

export interface CommandParser {
  isHelp: boolean;
  isDebug: boolean;
  all(): Command[];
  find(): Command | null;
  stripOptions: () => string[];
}
