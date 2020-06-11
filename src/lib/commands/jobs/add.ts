import promptly from "promptly";
import ssh from "../../ssh";
import { create } from "../../../models/command";

const description = "Creates a new cron job";

const hint = "<unique id> <'min hour day month week command'>";

interface CronJob {
  uniqueId: string;
}

const run = async (...args: string[]) => {
  let [id, commandToAdd] = args;
  id = id || (await promptly.prompt("Unique id for the job to add: "));
  commandToAdd = commandToAdd || (await promptly.prompt("Command to execute: "));

  ssh.execute(`cru a ${id} "${commandToAdd}"`);
};

export default create({ description, hint, run });
