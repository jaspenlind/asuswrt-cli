#!/usr/bin/env node
import chalk from "chalk";
import { ExecResult } from "../../types";

import sh = require("shelljs");
import config = require("./config");

const execute = (...args: string[]): ExecResult => {
  const sshConfig = config.get() || config.empty;

  const ssh = `ssh -i  '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  const command = args.join(" ");

  const result: ExecResult = sh.exec(`${ssh} "${command}"`);

  return result;
};

const executeInTerminal = (args: any) => {
  const sshConfig = config.get() || config.empty;

  const ssh = `ssh -i  '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  sh.exec(`osascript -e 'tell app "Terminal"
  activate
  do script "${ssh} ${args}"
end tell'`);
};

export default { execute, executeInTerminal };
