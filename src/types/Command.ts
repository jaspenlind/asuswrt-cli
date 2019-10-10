#!/usr/bin/env node

export default interface Command {
  description?: string;
  helpName?: string;
  run: (...args: string[]) => any;
  hint?: string;
}
