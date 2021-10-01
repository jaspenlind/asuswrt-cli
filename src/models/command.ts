import { Command, CommandRequirement } from "../types";
import { distinct } from "../lib/helpers/array.helpers";

export { Command, CommandRequirement };

export const empty: Command = Object.freeze({
  description: "",
  helpName: "",
  hint: "",
  run: () => "",
  requirements: []
});

export const create = (fields?: Partial<Command>, baseCommand?: Partial<Command>): Command => {
  const command: Command = {
    ...empty,
    ...baseCommand,
    ...fields
  };

  command.requirements = distinct(...command.requirements);

  return Object.freeze(command);
};

export const configCommand = (fields?: Partial<Command>): Command => {
  return create(fields);
};

export const merlinCommand = (fields?: Partial<Command>): Command => {
  return create(fields, {
    requirements: [CommandRequirement.SshConfig, CommandRequirement.Merlin]
  });
};

export const skynetCommand = (fields?: Partial<Command>): Command => {
  return create(fields, {
    requirements: [CommandRequirement.SshConfig, CommandRequirement.Merlin, CommandRequirement.Skynet]
  });
};

export default {
  create,
  empty
};
