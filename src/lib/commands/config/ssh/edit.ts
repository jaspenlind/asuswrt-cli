import configCreationData, {
  ConfigCreationData
} from "../../../../models/configCreationData";
import { create } from "../../../../models/command";
import { get, prompt } from "../../../ssh/config";
import { proceed } from "../../../ssh/config/check";

const description = "Edits current SSH configuration";

const hint = `[-host <name or IP of the router>]
                             [-userName <admin login>]
                             [-keyFile <path to SSH keyfile>]
                             [-passPhrase <passphrase of SSH keyfile]
                             [-addToAgent]
                             [-createKeyFile]`;

const run = (...args: string[]): void => {
  const initialValues = configCreationData.fromArgs(...args);
  console.log(initialValues);
  const existingValues: Partial<ConfigCreationData> = get() || {};

  prompt(initialValues, existingValues).then(config =>
    proceed(config, { overwrite: true })
  );
};

export default create({ description, hint, run });
