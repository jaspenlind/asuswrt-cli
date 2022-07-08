import chalk from "chalk";
import { flexi } from "flexi-path";
import { configCommand } from "../../../../models/command.mjs";
import { get, SshConfig } from "../../../ssh/config/index.mjs";

interface ConfigOptions extends SshConfig {
  keyFileExists: boolean;
  keyFileAddedToAgent: boolean;
}

const description = "Displays current SSH configuration";

const run = (): void => {
  const currentConfig = get();

  if (currentConfig === null) {
    console.log(chalk.red("SSH configuration does not exist"));
    return;
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const keyFileExists = flexi.exists(currentConfig.privateKey);
  const keyFileAddedToAgent = false;

  const result: ConfigOptions = {
    ...currentConfig,
    ...{ keyFileExists, keyFileAddedToAgent }
  };
  console.log(JSON.stringify(result, null, 2));
};

export default configCommand({ description, run });
