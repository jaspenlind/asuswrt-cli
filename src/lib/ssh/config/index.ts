import flexi, { TextTransform } from "flexi-path";
import { SshConfig } from "../../../types";
import check from "./check";
import generateSshKey from "./generateSshKey";

import prompt from "./prompt";

export { default as check } from "./check";
export { default as generateSshKey } from "./generateSshKey";
export { default as prompt } from "./prompt";

let file = flexi.path({
  basePath: __dirname,
  path: ".ssh.config.json"
});

export const empty: SshConfig = {
  host: "n/a",
  userName: "n/a",
  privateKey: "n/a"
};

export const exists = (): boolean => file.exists();

export const get = (): SshConfig | null => {
  return exists() ? file.read({ transform: TextTransform.JSON }) : null;
};

const jsonProperties = Object.keys(empty);

export const set = (current: SshConfig): void => {
  file = file.write(JSON.stringify(current, jsonProperties, 2));
};

export default {
  check,
  empty,
  exists,
  generateSshKey,
  get,
  prompt,
  set
};
