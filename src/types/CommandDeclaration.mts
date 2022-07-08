import { Command, CommandRequirement } from "./index.mjs";

export interface CommandDeclaration {
  args: string[];
  run: any;
  canRun: boolean;
  command: Command;
  fullName: string;
  name: string;
  subCommands: Promise<CommandDeclaration[]>;
  requires: (feature: CommandRequirement) => boolean;
}
