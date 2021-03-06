#!/usr/bin/env node
import chalk from "chalk";
import flexi, { FlexiPath } from "flexi-path";
import sh from "shelljs";
import { create } from "../../../../models/command";
import ssh from "../../../ssh";

const defaultOpener = "xdg-open";
const opener = new Map<NodeJS.Platform, string>([
  ["darwin", "open"],
  ["win32", "start"]
]);

const open = (file: FlexiPath): void => {
  if (!file.exists()) {
    console.log(chalk.red(`File "${file.path}" does not exist`));
    return;
  }
  const openCommand = opener.get(process.platform) || defaultOpener;

  sh.exec(`${openCommand} "${file.path}"`);
};

const description = "Transfers the firewall log";

const run = (): void => {
  const log = flexi.path("/tmp/mnt/USB/skynet/skynet.log");

  const downloadedFile = ssh.download(log);

  open(downloadedFile);
};

export default create({ description, run });
