import { SshConfig } from "./index.mjs";

export interface ConfigCreationData extends SshConfig {
  passPhrase: string;
  createKeyFile: boolean;
  addKeyToAgent: boolean;
}
