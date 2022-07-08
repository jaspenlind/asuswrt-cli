import promptly from "promptly";
import { create } from "../../../models/command.mjs";
import { execute } from "../../ssh/index.mjs";

const description = "Creates a new cron job";

const hint = "<unique id> <'min hour day month week command'>";

// interface CronJob {
//   uniqueId: string;
// }

const run = async (...args: string[]) => {
  let [id, commandToAdd] = args;
  id = id || (await promptly.prompt("Unique id for the job to add: "));
  commandToAdd = commandToAdd || (await promptly.prompt("Command to execute: "));

  execute(`cru a ${id} "${commandToAdd}"`);
};

export default create({ description, hint, run });
