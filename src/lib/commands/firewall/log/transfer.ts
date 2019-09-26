#!/usr/bin/env node
import { Command } from "../../../../types";
import ssh from "../../../ssh";

const transfer = (): void => {
  // TODO
  ssh.execute("cat /tmp/mnt/USB/skynet/skynet.log");
};

const declaration: Command = {
  run: transfer,
  description: "Transfers the firewall log"
};

export default declaration;
