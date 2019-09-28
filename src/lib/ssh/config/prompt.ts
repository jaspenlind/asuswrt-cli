import flexi from "flexi-path";

import {
  ConfigCreationData,
  defaults as dataDefaults
} from "../../../models/configCreationData";
import { PromptBody, PromptType } from "../../../types";
import promptTypes from "./promptTypes";

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
  if (initialValue !== undefined) {
    console.log(`${title}: ${initialValue}`);
    return Promise.resolve(initialValue);
  }

  return line<T>(title, fallbackValue, promptType);
};

const prompt = async (
  prefilledValues?: Partial<ConfigCreationData>,
  defaultValues?: Partial<ConfigCreationData>
): Promise<ConfigCreationData> => {
  const yes = "y";
  const yesNo = "Y/n";

  const initialValues = prefilledValues || {};
  const defaults: ConfigCreationData = {
    ...dataDefaults,
    ...defaultValues
  };

  const host = await promptOrDisplayInitialValue(
    "Router address",
    initialValues.host,
    defaults.host
  );

  const userName = await promptOrDisplayInitialValue(
    "User name",
    initialValues.userName,
    defaults.userName
  );

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

  const keyFileExists = flexi.exists(privateKey as string);

  let createKeyFile = initialValues.createKeyFile || false;

  if (!keyFileExists && !createKeyFile) {
    createKeyFile = await line(
      `The key file "${privateKey}" does not exist. Do you want to create it?`,
      yes,
      PromptType.Confirm,
      yesNo
    );
  }

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
