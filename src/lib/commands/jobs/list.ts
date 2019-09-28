import ssh from "../../ssh";
import { command } from "../../../types/Command";

const description = "Lists existing cron jobs";

const run = () => {
  ssh.execute("cru l");
};

export default command({ description, run });
