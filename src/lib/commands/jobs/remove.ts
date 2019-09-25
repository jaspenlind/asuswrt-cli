import promptly from "promptly";

import ssh from "../../ssh";

import { CommandDeclaration } from "../../../types";

const remove = async (...args: string[]) => {
  let [id] = args;
  id = id || (await promptly.prompt("Id of the job to remove: "));

  // ssh.execute(`cru a ${id} "${command}"`);

  console.log(`Job with id '${id}' was successfully removed`);
};

const declaration: CommandDeclaration = {
  description: "Removes a cron job",
  run: remove,
  usage: "<id>"
};

export default declaration;
