#!/usr/bin/env node
import { existsSync, readFileSync } from "fs";
import { join } from "path";

import sh from "shelljs";

const getConfig = () => {
  const sshConfigFile = join(__dirname, ".ssh.config.json");

  let config = {
    host: "n/a",
    username: "n/a",
    privateKey: "n/a"
  };

  if (existsSync(sshConfigFile)) {
    config = JSON.parse(readFileSync(sshConfigFile, "utf8"));
  }

  return config;
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
