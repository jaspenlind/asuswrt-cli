import {
  ConfigCreationData,
  empty
} from "../../../../types/ConfigCreationData";
import { command } from "../../../../types/Command";
import { get, prompt } from "../../../ssh/config";
import { proceed } from "../../../ssh/config/check";

const description = "Edits current SSH configuration";

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

  const existingValues: Partial<ConfigCreationData> = get() || {};

  prompt(initialValues, existingValues).then(config =>
    proceed(config, { overwrite: true })
  );
};

export default command({ description, hint, run });
