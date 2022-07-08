import promptly from "promptly";
import { create } from "../../../models/command.mjs";
import { execute } from "../../ssh/index.mjs";

const description = "Removes a cron job";

const hint = "<unique id>";

const run = async (...args: string[]) => {
  let [id] = args;
  id = id || (await promptly.prompt("Id of the job to remove: "));

  execute(`cru d ${id}`);
};

export default create({ description, hint, run });
