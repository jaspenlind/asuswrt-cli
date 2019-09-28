import flexi from "flexi-path";
import { homedir } from "os";

import { ConfigCreationData, sshConfig } from "../types";
import { toObject } from "../lib/mapHelper";
import { parse } from "../lib/optionParser";

export { ConfigCreationData };

export const empty = (): ConfigCreationData => ({
  ...sshConfig.empty,
  ...{
    passPhrase: "",
    createKeyFile: false,
    addKeyToAgent: false
  }
});

export const defaults: ConfigCreationData = {
  host: "192.168.1.1",
  userName: "admin",
  privateKey: flexi.path(homedir()).append(".ssh/id_rsa").path,
  passPhrase: "",
  createKeyFile: true,
  addKeyToAgent: true
};

export const fromArgs = (...args: string[]): Partial<ConfigCreationData> => {
  const options = parse(...args);

  return toObject(options);
};

export default {
  defaults,
  empty,
  fromArgs
};
