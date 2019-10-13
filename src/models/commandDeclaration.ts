import { Command, CommandDeclaration, CommandRequirement } from "../types";
import command from "./command";

export { Command, CommandDeclaration };

export const empty: CommandDeclaration = Object.freeze({
  args: [],
  canRun: false,
  command: command.empty,
  fullName: "",
  subCommands: [],
  name: "empty",
  requires: () => false
});

export const create = (
  fields?: Partial<CommandDeclaration>
): CommandDeclaration => {
  const declaration: CommandDeclaration = {
    ...empty,
    ...fields
  };

  declaration.requires = (feature: CommandRequirement) =>
    declaration.command.requirements.find(x => x === feature) !== undefined;

  return Object.freeze(declaration);
};

export default {
  create,
  empty
};
