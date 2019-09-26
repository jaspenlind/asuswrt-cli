import command, { Command } from "../types/Command";

const create = (options?: Partial<Command>): Command => {
  const cmd: Command = { ...command.empty, ...options };

  return cmd;
};

export default {
  create
};
/**  description?: string;
  helpName?: string;
  run: (...args: string[]) => any;
  hint?: string; */
// export default class EmptyCommand implements Command {
//   description?: string;

//   helpName?: string;

//   hint?: string;

//   name?: string;

//   constructor() {
//     this.name = "empty";
//   }

//   // protected canRun(): boolean;

//   public run(): any {
//     /* do nothing */
//   }
// }
