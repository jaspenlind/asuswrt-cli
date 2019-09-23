#!/usr/bin/env node
import ssh from "../../ssh";
import { CommandDeclaration } from "../../../types";

const uptime = (): void => {
  ssh.execute("uptime");
};

const declaration: CommandDeclaration = {
  description: "Display router uptime",
  run: uptime
};

export default declaration;
