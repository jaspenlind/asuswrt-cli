#!/usr/bin/env node
import flexi, { FlexiPath } from "flexi-path";
// eslint-disable-next-line import/order
import * as sh from "shelljs";
import os from "os";
import { get } from "./config";
import { empty } from "../../models/sshConfig";
import { ExecOptions, ExecResult } from "../../types";
// import config = require("./config");

export const download = (file: FlexiPath): FlexiPath => {
  const sshConfig = get() || empty;

  const command = `scp -i ${sshConfig.privateKey} "${sshConfig.userName}@${sshConfig.host}:${
    file.path
  }" "${os.tmpdir()}/."`;

  const result = sh.exec(command);

  if (result.code === 0) {
    return flexi.path(os.tmpdir()).append(file.base);
  }

  return flexi.empty();
};

export const execute = (command: string, options?: Partial<ExecOptions>): ExecResult => {
  const sshConfig = get() || empty;
  const silent = (options && options.silent) || false;

  const ssh = `ssh -i '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  const result: ExecResult = sh.exec(`${ssh} "${command}"`, { silent });

  return result;
};

export const executeInTerminal = (args: string | string[]): void => {
  const sshConfig = get() || empty;

  const ssh = `ssh -i  '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  sh.exec(`osascript -e 'tell app "Terminal"
  activate
  do script "${ssh} ${args}"
end tell'`);
};
