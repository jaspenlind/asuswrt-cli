import { parse } from "args-any";
import flexi from "flexi-path";
import { homedir } from "os";
import sshConfig from "./sshConfig";
import { ConfigCreationData } from "../types";

// export { ConfigCreationData };

export const empty = (): ConfigCreationData =>
  Object.freeze({
    ...sshConfig.empty,
    ...{
      passPhrase: "",
      createKeyFile: false,
      addKeyToAgent: false
    }
  });

export const defaults: ConfigCreationData = {
  host: "192.168.1.1",
  user: "admin",
  privateKeyFile: flexi.path(homedir()).append(".ssh/id_rsa").path,
  passPhrase: "",
  createKeyFile: true,
  addKeyToAgent: true
};

export const fromArgs = (...args: string[]): Partial<ConfigCreationData> => {
  const options = parse(args);

  return options.asPartial();
};

export default {
  defaults,
  empty,
  fromArgs
};
