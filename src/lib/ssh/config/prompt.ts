import flexi from "flexi-path";

import { defaults as dataDefaults } from "../../../models/config-creation-data";
import { ConfigCreationData, PromptBody, PromptType } from "../../../types";
import { promptTypes } from ".";

const yes = "y";
const yesNo = "Y/n";

const line = async <T>(
  text: string,
  defaultValue?: string,
  type = PromptType.Text,
  defaultText?: string
): Promise<T> => {
  const currentDefault = defaultText || defaultValue;
  const currentDefaultText = currentDefault ? ` [${currentDefault}]` : "";
  const message = `${text}${currentDefaultText}: `;

  return (promptTypes.get(type) as PromptBody)(message, {
    default: defaultValue
  });
};

const promptOrDisplayInitialValue = async <T>(
  title: string,
  initialValue: T | undefined,
  fallbackValue: string,
  promptType: PromptType = PromptType.Text
): Promise<T> => {
  if (initialValue) {
    console.log(`${title}: ${initialValue}`);
    return Promise.resolve(initialValue);
  }

  return line<T>(title, fallbackValue, promptType);
};

const initializeConfig = (
  prefilledValues?: Partial<ConfigCreationData>,
  defaultValues?: Partial<ConfigCreationData>
) => {
  const initialValues = prefilledValues || {};
  const defaults = {
    ...dataDefaults,
    ...defaultValues
  };

  return { initialValues, defaults };
};

const createKey = async (pathToKeyFile: string, config: Partial<ConfigCreationData>): Promise<boolean> => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const keyFileExists = flexi.exists(pathToKeyFile);

  if (!config.createKeyFile || keyFileExists) {
    return Promise.resolve(false);
  }

  return line(
    `The key file "${pathToKeyFile}" does not exist. Do you want to create it?`,
    yes,
    PromptType.Confirm,
    yesNo
  );
};
export const prompt = async (
  prefilledValues?: Partial<ConfigCreationData>,
  defaultValues?: Partial<ConfigCreationData>
): Promise<ConfigCreationData> => {
  const { initialValues, defaults } = initializeConfig(prefilledValues, defaultValues);

  const host = await promptOrDisplayInitialValue("Router address", initialValues.host, defaults.host);

  const userName = await promptOrDisplayInitialValue("User name", initialValues.userName, defaults.userName);

  const privateKey = await promptOrDisplayInitialValue(
    "SSH private key file",
    initialValues.privateKey,
    defaults.privateKey
  );

  const passPhrase = await promptOrDisplayInitialValue(
    "Passphrase for private key",
    initialValues.passPhrase,
    defaults.passPhrase,
    PromptType.Password
  );

  const createKeyFile = await createKey(privateKey, defaults);
  const addKeyToAgent =
    initialValues.addKeyToAgent ||
    (await line<boolean>(
      `Do you want to add the key "${privateKey}" to the SSH Agent?`,
      yes,
      PromptType.Confirm,
      yesNo
    ));

  const result: ConfigCreationData = {
    addKeyToAgent,
    createKeyFile,
    host,
    passPhrase,
    privateKey,
    userName
  };

  return result;
};

export default prompt;
