import promptly from "promptly";

import { exists, generateSshKey, prompt, set } from ".";

export const check = async () => {
  if (exists()) {
    return;
  }

  const runSetup = await promptly.confirm(
    "Router connection is not configured. Do you want to configure it up now? [Y/n]: ",
    {
      default: "y"
    }
  );

  if (runSetup) {
    const config = await prompt();

    if (config !== null) {
      set(config);
      generateSshKey(config);
    }
  }
};

export default check;
