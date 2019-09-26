#!/usr/bin/env node
import { Command } from "../../../types";
import ssh from "../../ssh";

const commands = (): void => {
  ssh.execute("ls -1 /usr/bin/ | grep -v '^d'");
};

const declaration: Command = {
  description: "Lists files in /usr/bin",
  run: commands
};

export default declaration;
