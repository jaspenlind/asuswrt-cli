import ssh from "../../ssh";

import { CommandDeclaration } from "../../../types";

const list = () => {
  ssh.execute("cru l");
};

const declaration: CommandDeclaration = {
  description: "Lists existing cron jobs",
  run: list
};

export default declaration;
