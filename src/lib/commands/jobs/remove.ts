import promptly from "promptly";
import ssh from "../../ssh";
import { create } from "../../../models/command";

const description = "Removes a cron job";

const hint = "<unique id>";

const run = async (...args: string[]) => {
  let [id] = args;
  id = id || (await promptly.prompt("Id of the job to remove: "));

  ssh.execute(`cru d ${id}`);
};

export default create({ description, hint, run });
