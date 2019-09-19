import promptly from "promptly";
import { KeyGenCreationData } from "ssh-keygen";

import { ConfigCreationData } from "../../../types";
import { exists, generateSshKey, prompt, set } from ".";

const routerInfo = (publicKey: string) => {
  console.log(`
To use this CLI you need to enable SSH in your router.

If you haven't already done that, follow these steps to enable SSH:
1. Open the router web interface and go to Administration / System
2. Set Enable SSH to 'LAN Only'
3. Set Allow Password Login to 'No'
4. Paste the public key below into the Authorized Keys field
5. Click Apply

Public key:
${publicKey}
`);
};

const skipConfig = "skipconfig";
const keyFileShouldNotBeCreated = "keyFileShouldNotBeCreated";

export const check = (): Promise<boolean> => {
  if (exists()) {
    return Promise.resolve(true);
  }

  let data: ConfigCreationData;

  return new Promise((resolve, reject) => {
    promptly
      .confirm(
        "Router connection is not configured. Do you want to run the setup now? [Y/n]: ",
        {
          default: "y"
        }
      )
      .then(x =>
        x ? prompt() : Promise.reject<ConfigCreationData>(new Error(skipConfig))
      )
      .then(x => {
        data = x;
        set(x);
        return data;
      })
      .then(x =>
        x.createKeyFile
          ? generateSshKey(x)
          : Promise.reject<KeyGenCreationData>(
              new Error(keyFileShouldNotBeCreated)
            )
      )
      .then(x => routerInfo(x.pubKey))
      .then(x => resolve(true))
      .catch((err: Error) => {
        if (
          err.message !== keyFileShouldNotBeCreated &&
          err.message !== skipConfig
        ) {
          reject(err);
        }

        if (err.message === skipConfig) {
          resolve(false);
        }
      });
  });
};

export default check;
