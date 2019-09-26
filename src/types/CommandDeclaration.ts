import command, { Command } from "./Command";
export interface CommandDeclaration {
  args: string[];
  canRun: boolean;
  command: Command;
  fullName: string;
  name: string;
  subCommands: CommandDeclaration[];
}

export const empty: CommandDeclaration = {
  args: [],
  canRun: false,
  command: command.empty,
  fullName: "",
  subCommands: [],
  name: "empty"
};

export default {
  empty
};
