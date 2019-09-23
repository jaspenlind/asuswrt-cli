#!/usr/bin/env node
import { CommandDeclaration } from "../../../../types";
import ssh from "../../../ssh";

const transfer = (): void => {
  // TODO
  ssh.execute("cat /tmp/mnt/USB/skynet/skynet.log");
};

const declaration = (): CommandDeclaration => ({
  run: transfer,
  description: "Transfers the firewall log"
});

export default declaration;
