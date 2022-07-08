import promptly from "promptly";

import { CommandDeclaration, CommandRequirement, ConfigCreationData } from "../../../types/index.mjs";
import { addToSshAgent, exists, generateSshKey, prompt, routerInfo, set } from "./index.mjs";

const runSetup = async (): Promise<boolean> =>
  promptly.confirm("Router connection is not configured. Do you want to run the setup now? [Y/n]: ", {
    default: "y"
  });

/**
 * @ignore
 */
export const proceed = async (config: ConfigCreationData, options?: { overwrite?: boolean }): Promise<void> => {
  await set(config, options);

  let pubKey: string | undefined;
  if (config.createKeyFile) {
    const keyCreationData = await generateSshKey(config);
    ({ pubKey } = keyCreationData);
  }

  if (config.addKeyToAgent) {
    addToSshAgent(config);
  }

  routerInfo(pubKey);
};

export const check = async (currentCommand?: CommandDeclaration): Promise<boolean> => {
  const requiresConfig = currentCommand?.requires(CommandRequirement.SshConfig);

  if (exists() || !requiresConfig) {
    return true;
  }
  if (!(await runSetup())) {
    return false;
  }

  const newConfig = await prompt();

  proceed(newConfig);

  return true;
};
