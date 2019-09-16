#!/usr/bin/env node
import ssh from "../../ssh";

const commands = (): void => {
  ssh.execute("ls -1 /usr/bin/ | grep -v '^d'");
};

export default {
  run: commands,
  description: "Lists files in /usr/bin"
};
