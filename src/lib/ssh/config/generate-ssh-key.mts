import chalk from "chalk";
import { default as keygen } from "ssh-keygen-lite";

import { ConfigCreationData } from "../../../types/index.mjs";

const config = (data : ConfigCreationData) => ({ 
  location: data.privateKey,
  password: data.passPhrase
});

export const generateSshKey = (data: ConfigCreationData): Promise<{key: string, pubKey: string}> =>
  keygen(config(data))
    .then(result => {
      console.log("SSH key was successfully generated.");
      return result;
    })
    .catch(reason => {
      const err = reason || "Unknown error";
      console.log(chalk.red(err));
      return Promise.reject(new Error(err));
    });
