import promptly from "promptly";

import ssh from "../../ssh";

import { CommandDeclaration } from "../../../types";

const remove = async (...args: string[]) => {
  let [id] = args;
  id = id || (await promptly.prompt("Id of the job to remove: "));

  ssh.execute(`cru d ${id}`);
};

const declaration: CommandDeclaration = {
  description: "Removes a cron job",
  run: remove,
  hint: "<unique id>"
};

export default declaration;
