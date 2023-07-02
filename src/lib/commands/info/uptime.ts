#!/usr/bin/env node
import { merlinCommand } from "../../../models/command";
import { createSSH, withConsole } from "../../ssh";

const description = "Display router uptime";

const run = () => createSSH().exec("uptime", withConsole).start();

export default merlinCommand({ description, run });
