import promptly from "promptly";

import edit from "./edit";
import { configCommand } from "../../../../models/command";
import { fromArgs } from "../../../../models/config-creation-data";
import { ConfigCreationData } from "../../../../types";
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
    promptly.confirm("SSH configuration already exists. Do you want to update instead? [y/N]: ").then((response) => {
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
