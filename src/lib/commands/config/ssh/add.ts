import promptly from "promptly";

import edit from "./edit";
import configCreationData, {
  ConfigCreationData
} from "../../../../models/configCreationData";
import { command } from "../../../../types/Command";
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
      .confirm(
        "SSH configuration does already exist. Do you want to update instead? [y/N]: "
      )
      .then(response => {
        if (response) {
          edit.run(...args);
        }
      });

    return;
  }

  const initialValues: Partial<
    ConfigCreationData
  > = configCreationData.fromArgs(...args);

  prompt(initialValues).then(config => proceed(config));
};

export default command({ description, hint, run });
