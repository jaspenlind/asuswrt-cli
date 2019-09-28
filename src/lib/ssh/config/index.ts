import flexi, { TextTransform } from "flexi-path";
import { sshConfig, SshConfig } from "../../../types";
import check from "./check";
import generateSshKey from "./generateSshKey";

import prompt from "./prompt";
import routerInfo from "./routerInfo";

export { default as check } from "./check";
export { default as generateSshKey } from "./generateSshKey";
export { default as prompt } from "./prompt";
export { default as routerInfo } from "./routerInfo";

let file = flexi.path({
  basePath: __dirname,
  path: ".ssh.config.json"
});

export { ConfigCreationData, SshConfig } from "../../../types";

export const exists = () => file.exists();

export const get = (): SshConfig | null => {
  return exists() ? file.read({ transform: TextTransform.JSON }) : null;
};

const jsonProperties = Object.keys(sshConfig.empty);

export const set = (
  current: SshConfig,
  options?: { overwrite?: boolean }
): Promise<SshConfig> => {
  return new Promise<SshConfig>((resolve, reject) => {
    try {
      file = file.write(JSON.stringify(current, jsonProperties, 2), {
        overwrite: options && options.overwrite
      });

      resolve(get() || sshConfig.empty);
    } catch (err) {
      reject(err);
    }
  });
};

export default {
  check,
  exists,
  generateSshKey,
  get,
  prompt,
  routerInfo,
  set
};
