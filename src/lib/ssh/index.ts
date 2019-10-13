#!/usr/bin/env node
import os from "os";
import flexi, { FlexiPath } from "flexi-path";

import { ExecResult } from "../../types";
import { empty } from "../../models/sshConfig";

import sh = require("shelljs");
import config = require("./config");

export const download = (file: FlexiPath): FlexiPath => {
  const sshConfig = config.get() || empty;

  const command = `scp -i ${sshConfig.privateKey} "${sshConfig.userName}@${
    sshConfig.host
  }:${file.path}" "${os.tmpdir()}/."`;

  const result = sh.exec(command);

  if (result.code === 0) {
    return flexi.path(os.tmpdir()).append(file.base);
  }

  return flexi.empty();
};

const execute = (...args: string[]): ExecResult => {
  const sshConfig = config.get() || empty;

  const ssh = `ssh -i '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  const command = args.join(" ");

  const result: ExecResult = sh.exec(`${ssh} "${command}"`);

  return result;
};

const executeInTerminal = (args: string | string[]) => {
  const sshConfig = config.get() || empty;

  const ssh = `ssh -i  '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  sh.exec(`osascript -e 'tell app "Terminal"
  activate
  do script "${ssh} ${args}"
end tell'`);
};

export default { download, execute, executeInTerminal };
