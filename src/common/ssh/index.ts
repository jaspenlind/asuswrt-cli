#!/usr/bin/env node

import sh from "shelljs";
import config from "./.ssh.config.json";

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
