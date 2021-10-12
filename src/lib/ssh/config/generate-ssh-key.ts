import chalk from "chalk";
import keygen, { KeyGenCreationData } from "ssh-keygen";

import { ConfigCreationData } from "../../../types";

export const generateSshKey = (data: ConfigCreationData): Promise<KeyGenCreationData> => {
  const promise = new Promise<KeyGenCreationData>((resolve, reject) => {
    keygen({ location: data.privateKey, password: data.passPhrase }, (err, out) => {
      if (err) {
        console.log(chalk.red(err));
        reject(new Error(err));
      } else if (out !== undefined) {
        console.log("SSH key was successfully generated.");
        resolve(out);
      }

      reject(new Error("Unknown error"));
    });
  });

  return promise;
};

export default generateSshKey;
