#!/usr/bin/env node
import { create } from "../../../models/command";
import ssh from "../../ssh";

const description = "Lists files in /usr/bin";

const run = (): void => {
  ssh.execute("ls -1 /usr/bin/ | grep -v '^d'");
};

export default create({ description, run });
