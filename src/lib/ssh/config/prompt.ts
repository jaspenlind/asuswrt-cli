import chalk from "chalk";
import os from "os";
import promptly from "promptly";

import flexi from "flexi-path";
import { ConfigCreationData, PromptBody, PromptType } from "../../../types";

const promptTypes = new Map<PromptType, PromptBody>([
  [PromptType.Text, promptly.prompt],
  [PromptType.Password, promptly.password],
  [PromptType.Confirm, promptly.confirm]
]);

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

export const prompt = async (): Promise<ConfigCreationData | null> => {
  const yes = "y";
  const yesNo = "Y/n";

  const defaults: ConfigCreationData = {
    host: "192.168.1.1",
    userName: "admin",
    privateKey: flexi.path(os.homedir()).append(".ssh/id_rsa").path,
    passPhrase: "",
    createKeyFile: true,
    addKeyToAgent: true
  };

  try {
    const host = await line("Router address", defaults.host);
    const userName = await line("User name", defaults.userName);
    const privateKey = await line("SSH private key file", defaults.privateKey);
    const passPhrase = await line(
      "Passphrase for private key",
      defaults.passPhrase,
      PromptType.Password
    );

    const keyFileExists = flexi.exists(privateKey as string);

    let createKeyFile = false;

    if (!keyFileExists) {
      createKeyFile = await line(
        `The key file "${privateKey}" does not exist. Do you want to create it?`,
        yes,
        PromptType.Confirm,
        yesNo
      );
    }

    const addKeyToAgent = await line(
      `Do you want to add the key "${privateKey}" to the SSH Agent?`,
      yes,
      PromptType.Confirm,
      yesNo
    );

    return {
      host,
      userName,
      privateKey,
      passPhrase,
      createKeyFile,
      addKeyToAgent
    } as ConfigCreationData;
  } catch (err) {
    console.log(chalk.red(err.message));
    return null;
  }
  // SSH private key file [~/.ssh/id_rsa]:
  // Passphrase for private key [$passphrase]:
  // The key file $privateKey does not exist. Do you want to create it? [Y/n]
  // Do you want to add the key $privateKey to the SSH Agent? [Y/n]

  /*
    echo "The access the router from the CLI you need to enable SSH."
echo "1. Open the router web interface and go to Administration / System"
echo "2. Set Enable SSH to 'LAN Only'"
echo "3. Set Allow Password Login to 'No'"
echo "4. Paste to content of '$privateKey.pub' in the Authorized Keys field"
echo "5. Click Apply"
     */
};

export default prompt;
