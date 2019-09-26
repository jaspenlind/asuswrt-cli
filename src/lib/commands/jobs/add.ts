import promptly from "promptly";
import ssh from "../../ssh";
import { create } from "../../../types/Command";

const description = "Creates a new cron job";

const hint = "<unique id> <'min hour day month week command'>";

const run = async (...args: string[]) => {
  let [id, command] = args;
  id = id || (await promptly.prompt("Unique id for the job to add: "));
  command = command || (await promptly.prompt("Command to execute: "));

  ssh.execute(`cru a ${id} "${command}"`);
};

export default create({ description, hint, run });
