#!/usr/bin/env node
const sh = require("shelljs");
const config = require("./.ssh.config.json");

const execute = args => {
  const ssh = `ssh -i  '${config.privateKey}' ${config.username}@${config.host}`;
  //console.log(args);
  if (!Array.isArray(args)) {
    sh.exec(`osascript -e 'tell app "Terminal"
    activate
    do script "${ssh} ${args}"
  end tell'`);
  } else {
    sh.exec(`${ssh} "${args.join(" ")}"`);
  }
};

module.exports = {
  execute: execute
};
