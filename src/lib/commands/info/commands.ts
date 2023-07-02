#!/usr/bin/env node
import { merlinCommand } from "../../../models/command";

import { createSSH, withConsole } from "../../ssh";

const description = "Lists files in /usr/bin";

const run = () => createSSH().exec("ls -1 /usr/bin/ | grep -v '^d'", withConsole).start();

export default merlinCommand({ description, run });
