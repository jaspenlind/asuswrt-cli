#!/usr/bin/env node
import { CommandDeclaration } from ".";

export default interface CommandParser {
  isHelp: boolean;
  isDebug: boolean;
  all: () => CommandDeclaration[];
  find: () => CommandDeclaration;
  stripOptions: () => string[];
}
