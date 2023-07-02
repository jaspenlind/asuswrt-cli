#!/usr/bin/env node

import flexi, { FlexiPath } from "flexi-path";
// eslint-disable-next-line import/order
import sh = require("shelljs");
import SSH, { ExecOptions as SSHExecOptions } from "simple-ssh";
import { exec } from "child_process";
import { readFileSync } from "fs";
import os from "os";
import { get } from "./config";
import { empty } from "../../models/sshConfig";
import { ExecOptions, ExecResult } from "../../types";
// import config = require("./config");

export const download = (file: FlexiPath): FlexiPath => {
  const sshConfig = get() || empty;

  const command = `sudo scp -i ${sshConfig.privateKeyFile} "${sshConfig.user}@${sshConfig.host}:${
    file.path
  }" "${os.tmpdir()}/."`;

  const result = sh.exec(command);

  if (result.code === 0) {
    return flexi.path(os.tmpdir()).append(file.base);
  }

  return flexi.empty();
};

const sshOld = (command: string) => {
  const sshConfig = get() || empty;

  return `ssh -i '${sshConfig.privateKeyFile}' ${sshConfig.user}@${sshConfig.host} "${command}"`;
};

export const withConsole = <SSHExecOptions>{ out: console.log.bind(console) };

export const createSSH = () => {
  const { host, user, privateKeyFile, passphrase } = get() || empty;

  const ssh = new SSH({
    host,
    user,
    key: readFileSync(privateKeyFile, { encoding: "utf-8" }),
    passphrase
  });

  ssh.exec("");
  ssh
    .on("error", (err) => {
      console.log("Oops, something went wrong.");
      console.log(err);
      ssh.end();
    })
    .on("ready", () => console.log("SSH connected"))
    .on("end", () => console.log("SSH disconnected"));

  return ssh;
};

export const execute = (command: string, options?: Partial<ExecOptions>): ExecResult =>
  sh.exec(sshOld(command), { silent: options?.silent || false });

export const execute2 = (command: string): ExecResult => {
  const result: ExecResult = {
    code: 0,
    stderr: "",
    stdout: ""
  };

  // try {
  // } catch (error: ExecException) {}

  // eslint-disable-next-line security/detect-child-process
  exec(sshOld(command), (error, stdout, stderr) => {
    if (error) {
      result.code = error.code || -1;
      result.stderr = error.message;
    } else if (stderr) {
      result.stderr = stderr;
      result.code = -1;
    } else {
      result.code = 0;
      result.stdout = stdout;
    }
  });

  return result;
};

export const executeInTerminal = (args: string | string[]): void => {
  const sshConfig = get() || empty;

  const c = `ssh -i  '${sshConfig.privateKeyFile}' ${sshConfig.user}@${sshConfig.host}`;

  sh.exec(`osascript -e 'tell app "Terminal"
  activate
  do script "${c} ${args}"
end tell'`);
};
