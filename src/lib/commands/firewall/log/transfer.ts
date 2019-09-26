#!/usr/bin/env node
import { create } from "../../../../types/Command";
import ssh from "../../../ssh";

const description = "Transfers the firewall log";

const run = (): void => {
  // TODO
  ssh.execute("cat /tmp/mnt/USB/skynet/skynet.log");
};

export default create({ description, run });
