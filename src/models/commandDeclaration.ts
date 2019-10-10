import { CommandDeclaration } from "../types";
import command from "./command";

export { CommandDeclaration };

export const empty: CommandDeclaration = Object.freeze({
  args: [],
  canRun: false,
  command: command.empty,
  fullName: "",
  subCommands: [],
  name: "empty"
});

export const create = (
  fields?: Partial<CommandDeclaration>
): CommandDeclaration => ({ ...empty, ...fields });

export default {
  create,
  empty
};
