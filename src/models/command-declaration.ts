import command from "./command";
import { Command, CommandDeclaration, CommandRequirement } from "../types";

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

export const create = (fields?: Partial<CommandDeclaration>): CommandDeclaration => {
  const declaration: CommandDeclaration = {
    ...empty,
    ...fields
  };

  declaration.requires = (feature: CommandRequirement) => declaration.command.requirements.some((x) => x === feature);

  return Object.freeze(declaration);
};

export default {
  create,
  empty
};
