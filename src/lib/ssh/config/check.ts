import promptly from "promptly";

import { exists, generateSshKey, prompt, routerInfo, set } from ".";

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
  await set(newConfig);

  let pubKey: string | undefined;
  if (newConfig.createKeyFile) {
    const keyCreationData = await generateSshKey(newConfig);
    pubKey = keyCreationData.pubKey;
  }

  routerInfo(pubKey);

  return true;
};

export default check;
