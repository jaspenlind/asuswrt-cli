import command from "./command.mjs";
import { CommandDeclaration, CommandRequirement } from "../types/index.mjs";

export const empty: CommandDeclaration = Object.freeze({
  args: [],
  canRun: false,
  run: undefined,
  command: command.empty,
  fullName: "",
  subCommands: Promise.all([]),
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
