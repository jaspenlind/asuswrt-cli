import flexi, { TextTransform } from "flexi-path";
import { empty, SshConfig } from "../../../models/sshConfig";
// import check from "./check";
// import generateSshKey from "./generate-ssh-key";

// import prompt from "./prompt";

export { addToSshAgent } from "./add-to-ssh-agent";
export { check } from "./check";
export { generateSshKey } from "./generate-ssh-key";
export { prompt } from "./prompt";
export { promptTypes } from "./prompt-types";
export { routerInfo } from "./router-info";

let file = flexi.path({
  basePath: __dirname,
  path: ".ssh.config.json"
});

export { ConfigCreationData, SshConfig } from "../../../types";

export const exists = (): boolean => file.exists();

export const get = (): SshConfig | null => {
  return exists() ? file.read({ transform: TextTransform.JSON }) : null;
};

const jsonProperties = Object.keys(empty);

export const set = (current: SshConfig, options?: { overwrite?: boolean }): Promise<SshConfig> => {
  return new Promise<SshConfig>((resolve, reject) => {
    try {
      file = file.write(JSON.stringify(current, jsonProperties, 2), {
        overwrite: options?.overwrite || false
      });

      resolve(get() || empty);
    } catch (err) {
      reject(err);
    }
  });
};

// export default {
//   check,
//   exists,
//   generateSshKey,
//   get,
//   prompt,
//   set
// };
