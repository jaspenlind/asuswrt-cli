#!/usr/bin/env node
import { CommandDeclaration } from "../../../types";
import ssh from "../../ssh";

const commands = (): void => {
  ssh.execute("ls -1 /usr/bin/ | grep -v '^d'");
};

const declaration: CommandDeclaration = {
  description: "Lists files in /usr/bin",
  run: commands
};

export default declaration;
