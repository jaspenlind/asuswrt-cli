import { createRequire } from "module";
const require = createRequire(import.meta.url);
const flexi = require("flexi-path").flexi;
import { TextTransform } from "flexi-path";
import { empty, SshConfig } from "../../../models/sshConfig.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import check from "./check";
// import generateSshKey from "./generate-ssh-key";

// import prompt from "./prompt";

export { addToSshAgent } from "./add-to-ssh-agent.mjs";
export { check } from "./check.mjs";
export { generateSshKey } from "./generate-ssh-key.mjs";
export { prompt } from "./prompt.mjs";
export { promptTypes } from "./prompt-types.mjs";
export { routerInfo } from "./router-info.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let file = flexi.path({
  basePath: __dirname,
  path: ".ssh.config.json"
});

export { ConfigCreationData, SshConfig } from "../../../types/index.mjs";

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
