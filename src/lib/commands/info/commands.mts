#!/usr/bin/env node
import { merlinCommand } from "../../../models/command.mjs";

import { execute } from "../../ssh/index.mjs";

const description = "Lists files in /usr/bin";

const run = (): void => {
  execute("ls -1 /usr/bin/ | grep -v '^d'");
};

export default merlinCommand({ description, run });
