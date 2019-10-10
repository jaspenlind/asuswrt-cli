import { Command } from ".";

export default interface CommandDeclaration {
  args: string[];
  canRun: boolean;
  command: Command;
  fullName: string;
  name: string;
  subCommands: CommandDeclaration[];
}
