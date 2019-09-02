#!/usr/bin/env node
import { existsSync, readFileSync } from "fs";
import sh from "shelljs";

const sshConfigFile = "./ssh.config.json";

let config = {
  host: "n/a",
  username: "n/a",
  privateKey: "n/a"
};

if (existsSync(sshConfigFile)) {
  config = JSON.parse(readFileSync(sshConfigFile, "utf8"));
}

const execute = (args: any): void => {
  const ssh = `ssh -i  '${config.privateKey}' ${config.username}@${config.host}`;
  if (!Array.isArray(args)) {
    sh.exec(`osascript -e 'tell app "Terminal"
    activate
    do script "${ssh} ${args}"
  end tell'`);
  } else {
    sh.exec(`${ssh} "${args.join(" ")}"`);
  }
};

export default { execute };
