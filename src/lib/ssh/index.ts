#!/usr/bin/env node
import sh from "shelljs";
import config from "./config";

const execute = (...args: string[]): void => {
  const sshConfig = config.get() || config.empty;

  const ssh = `ssh -i  '${sshConfig.privateKey}' ${sshConfig.userName}@${sshConfig.host}`;

  sh.exec(`${ssh} "${args.join(" ")}"`);
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
