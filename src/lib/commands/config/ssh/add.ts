import {
  ConfigCreationData,
  empty
} from "../../../../types/ConfigCreationData";
import { command } from "../../../../types/Command";
import { prompt } from "../../../ssh/config";

const description = "Creates new SSH configuration";

const hint = "<hostName> <userName> <keyFile> <passPhrase> <addToAgent>";

const run = (...args: string[]): void => {
  // const data: ConfigCreationData = { ...empty, ...args };
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

  prompt(initialValues).then(data => {
    console.log(data);
  });
};

export default command({ description, hint, run });
