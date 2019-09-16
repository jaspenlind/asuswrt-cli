#!/usr/bin/env node
import { Command } from ".";

export interface CommandParser {
  all(): Command[];
  find(): Command | null;
  isHelp: boolean;
  isDebug: boolean;
  stripOptions: () => string[];
}
