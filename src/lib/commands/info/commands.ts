#!/usr/bin/env node
import { merlinCommand } from "../../../models/command";

import ssh from "../../ssh";

const description = "Lists files in /usr/bin";

const run = (): void => {
  ssh.execute("ls -1 /usr/bin/ | grep -v '^d'");
};

export default merlinCommand({ description, run });
