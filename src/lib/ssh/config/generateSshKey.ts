import chalk from "chalk";
import keygen from "ssh-keygen";

import { ConfigCreationData } from "../../../types";

const generateSshKey = (data: ConfigCreationData): void => {
  if (!data.createKeyFile) {
    return;
  }

  keygen(
    { location: data.privateKey, password: data.passPhrase },
    (err, out) => {
      if (err) {
        console.log(chalk.red(err));
      } else if (out !== undefined) {
        console.log("SSH key was successfully generated.");
      }
    }
  );
};

export default generateSshKey;
