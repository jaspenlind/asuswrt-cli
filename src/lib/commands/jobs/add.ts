import promptly from "promptly";

import ssh from "../../ssh";

import { Command } from "../../../types";

const add = async (...args: string[]) => {
  let [id, command] = args;
  id = id || (await promptly.prompt("Unique id for the job to add: "));
  command = command || (await promptly.prompt("Command to execute: "));

  ssh.execute(`cru a ${id} "${command}"`);
};

const declaration: Command = {
  description: "Creates a new cron job",
  run: (...args) => add(...args),
  hint: "<unique id> <'min hour day month week command'>"
};

export default declaration;
