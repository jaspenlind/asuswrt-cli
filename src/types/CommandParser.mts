#!/usr/bin/env node
import { CommandDeclaration } from "./index.mjs";

export interface CommandParser {
  isHelp: boolean;
  isDebug: boolean;
  all: () => CommandDeclaration[];
  find: () => CommandDeclaration;
  stripOptions: () => string[];
}
