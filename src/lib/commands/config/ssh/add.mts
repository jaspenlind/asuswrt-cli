import promptly from "promptly";

import edit from "./edit.mjs";
import { configCommand } from "../../../../models/command.mjs";
import { fromArgs } from "../../../../models/config-creation-data.mjs";
import { ConfigCreationData } from "../../../../types/index.mjs";
import { exists, prompt } from "../../../ssh/config/index.mjs";
import { proceed } from "../../../ssh/config/check.mjs";

const description = "Creates new SSH configuration";

const hint = `[-host <name or IP of the router>]
                             [-userName <admin login>]
                             [-keyFile <path to SSH keyfile>]
                             [-passPhrase <passphrase of SSH keyfile]
                             [-addToAgent]
                             [-createKeyFile]`;

const run = (...args: string[]): void => {
  if (exists()) {
    promptly
      .confirm("SSH configuration does already exist. Do you want to update instead? [y/N]: ")
      .then((response) => {
        if (response) {
          edit.run(...args);
        }
      });

    return;
  }

  const initialValues: Partial<ConfigCreationData> = fromArgs(...args);

  prompt(initialValues).then((config) => proceed(config));
};

export default configCommand({ description, hint, run });
