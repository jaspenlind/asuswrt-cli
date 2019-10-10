import { Command } from "../types";

export { Command };

export const empty: Command = Object.freeze({
  description: "",
  helpName: "",
  hint: "",
  run: () => {}
});

export const create = (fields?: Partial<Command>): Command => ({
  ...empty,
  ...fields
});

export default {
  create,
  empty
};
