import promptly from "promptly";

const createConfig = async (): Promise<{ host: string; userName: string }> => {
  const result = await promptly.confirm(
    "Could not found SSH configuration. Do you want to create it now?"
  );

  if (result) {
    const host = await promptly.prompt(
      "Enter router IP address (192.168.1.1): ",
      {
        default: "192.168.1.1"
      }
    );
    const userName = await promptly.prompt("Enter your user name: ");

    return { host, userName };
  }

  return Promise.reject();
};

const createConfigSync = (): { host: string; userName: string } | undefined => {
  let config: { host: string; userName: string } | undefined;

  createConfig().then(x => {
    config = x;
  });

  return config;
};

export default createConfigSync;
