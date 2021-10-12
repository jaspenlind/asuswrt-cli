import promptly from "promptly";

import { ConfigCreationData } from "../../../../types";
import { fromArgs } from "../../../../models/config-creation-data";
import edit from "./edit";
// import configCreationData, { ConfigCreationData } from "../../../../models/configCreationData";
import { configCommand } from "../../../../models/command";
import { exists, prompt } from "../../../ssh/config";
import { proceed } from "../../../ssh/config/check";

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
