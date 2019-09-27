import promptly from "promptly";

import edit from "./edit";
import {
  ConfigCreationData,
  empty
} from "../../../../types/ConfigCreationData";
import { command } from "../../../../types/Command";
import { exists, prompt } from "../../../ssh/config";
import { proceed } from "../../../ssh/config/check";

const description = "Creates new SSH configuration";

const hint =
  "<hostName> <userName> <keyFile> <passPhrase> <addToAgent> <createKeyFile>";

const run = (...args: string[]): void => {
  const [
    host,
    userName,
    privateKey,
    passPhrase,
    addKeyToAgent,
    createKeyFile
  ] = args;

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

  const initialValues: ConfigCreationData = {
    ...empty,
    ...{
      host,
      userName,
      privateKey,
      passPhrase,
      addKeyToAgent: addKeyToAgent === "true",
      createKeyFile: createKeyFile === "true"
    }
  };

  prompt(initialValues).then(config => proceed(config));
};

export default command({ description, hint, run });
