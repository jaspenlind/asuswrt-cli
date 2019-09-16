#!/usr/bin/env node
import ssh from "../../../ssh";

const transfer = (): void => {
  // TODO
  ssh.execute("cat /tmp/mnt/USB/skynet/skynet.log");
};

export default {
  run: transfer,
  description: "Transfers the firewall log"
};
