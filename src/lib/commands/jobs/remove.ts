import promptly from "promptly";
import ssh from "../../ssh";
import { command } from "../../../types/Command";

const description = "Removes a cron job";

const hint = "<unique id>";

const run = async (...args: string[]) => {
  let [id] = args;
  id = id || (await promptly.prompt("Id of the job to remove: "));

  ssh.execute(`cru d ${id}`);
};

export default command({ description, hint, run });
