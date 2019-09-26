import ssh from "../../ssh";

import { Command } from "../../../types";

const list = () => {
  ssh.execute("cru l");
};

const declaration: Command = {
  description: "Lists existing cron jobs",
  run: list
};

export default declaration;
