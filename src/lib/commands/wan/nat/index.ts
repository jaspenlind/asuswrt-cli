#!/usr/bin/env node

import { merlinCommand } from "../../../../models/command";
import { createSSH } from "../../../ssh";

const description = "Displays nat configuration";

const get = (key: string) =>
  new Promise<string>((resolve, reject) => {
    const ssh = createSSH();
    ssh
      .exec(`nvram get ${key}`, {
        out: (stdOut) => {
          resolve(stdOut);
        },
        err: (stdErr) => {
          reject(stdErr);
        }
      })
      .start();
  });

const run = () => {
  get("vts_enable_x").then((result) => {
    console.log(`Enabled: ${result === "1"}`);
  });
};

export default merlinCommand({ description, run });
