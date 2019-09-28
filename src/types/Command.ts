#!/usr/bin/env node

export interface Command {
  description?: string;
  helpName?: string;
  run: (...args: string[]) => any;
  hint?: string;
}

export const empty: Command = {
  description: "",
  helpName: "",
  hint: "",
  run: () => {}
};

export const command = (fields?: Partial<Command>): Command => ({
  ...empty,
  ...fields
});

export default {
  create: command,
  empty
};
