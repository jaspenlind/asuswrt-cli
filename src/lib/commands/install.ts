#!/usr/bin/env node
import { create } from "../../models/command";
import { createSSH } from "../ssh";

const hashbang = "#!/bin/sh";

const description = "Installs Router CLI";

const run = (...args: string[]) => {
  const ssh = createSSH();

  // console.log("Installing Router CLI...");
  // console.log("Set up SSH config (Already set up - overwrite? Y/n");
  // console.log("Create /jffs/scripts/services-start if not exists");
  // console.log("Add +x for services-start");
  // console.log("Add cli-start to services-start if not exists");
  // console.log("Create cli-start if not exists");

  // pty: true
  const cliStart = "cli-start";
  const scripts = "/jffs/scripts";

  ssh
    .exec(`ls ${scripts} | grep ${cliStart}`, {
      out: console.log.bind(console),
      exit: (code) => {
        if (code !== 0) {
          ssh
            .exec(`echo '${hashbang}' > ${scripts}/${cliStart}`)
            .exec(
              "echo 'cru a disable_wan \\\"5 0 * * Mon-Fri nvram set wan0_enable=0; nvram commit; service restart_wan\\\"' >> /jffs/scripts/cli-start"
            );
        }
      }
    })
    .start();
};

export default create({ description, run });
