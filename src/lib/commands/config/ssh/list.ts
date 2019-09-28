import chalk from "chalk";
import flexi from "flexi-path";

import config, { SshConfig } from "../../../ssh/config";
import { command } from "../../../../types/Command";

interface ConfigOptions extends SshConfig {
  keyFileExists: boolean;
  keyFileAddedToAgent: boolean;
}

const description = "Displays current SSH configuration";

const run = (): void => {
  const currentConfig = config.get();

  if (currentConfig === null) {
    console.log(chalk.red("SSH configuration does not exist"));
    return;
  }

  const keyFileExists = flexi.exists(currentConfig.privateKey);
  const keyFileAddedToAgent = false;

  const result: ConfigOptions = {
    ...currentConfig,
    ...{ keyFileExists, keyFileAddedToAgent }
  };
  console.log(JSON.stringify(result, null, 2));
};

export default command({ description, run });
