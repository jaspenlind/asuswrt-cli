#!/usr/bin/env node
import sh from "shelljs";

import flexi, { TextTransform } from "flexi-path";

import { SshConfig } from "../../types";

const getConfig = (): SshConfig => {
  const sshConfigFile = flexi.path({
    basePath: __dirname,
    path: ".ssh.config.json"
  });

  const emptyConfig = {
    host: "n/a",
    username: "n/a",
    privateKey: "n/a"
  };

  return sshConfigFile.exists()
    ? sshConfigFile.read({ transform: TextTransform.JSON })
    : emptyConfig;
};

const execute = (...args: string[]): void => {
  const config = getConfig();

  const ssh = `ssh -i  '${config.privateKey}' ${config.username}@${config.host}`;

  sh.exec(`${ssh} "${args.join(" ")}"`);
};

const executeInTerminal = (args: any) => {
  const config = getConfig();

  const ssh = `ssh -i  '${config.privateKey}' ${config.username}@${config.host}`;

  sh.exec(`osascript -e 'tell app "Terminal"
  activate
  do script "${ssh} ${args}"
end tell'`);
};

export default { execute, executeInTerminal };
