import promptly from "promptly";

import { ConfigCreationData } from "../../../types";
import { exists, generateSshKey, prompt, routerInfo, set } from ".";

/**
 * @ignore
 */
export const proceed = async (
  config: ConfigCreationData,
  options?: { overwrite?: boolean }
): Promise<void> => {
  await set(config, options);

  let pubKey: string | undefined;
  if (config.createKeyFile) {
    const keyCreationData = await generateSshKey(config);
    ({ pubKey } = keyCreationData);
  }

  routerInfo(pubKey);
};

const check = async (): Promise<boolean> => {
  if (exists()) {
    return true;
  }

  const runSetup = await promptly.confirm(
    "Router connection is not configured. Do you want to run the setup now? [Y/n]: ",
    {
      default: "y"
    }
  );

  if (!runSetup) {
    return false;
  }

  const newConfig = await prompt();

  proceed(newConfig);

  return true;
};

export default check;
