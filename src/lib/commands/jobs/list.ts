import ssh from "../../ssh";
import { create } from "../../../models/command";

const description = "Lists existing cron jobs";

const run = () => {
  ssh.execute("cru l");
};

export default create({ description, run });
