import { SshConfig } from ".";

export interface ConfigCreationData extends SshConfig {
  passPhrase: string;
  createKeyFile: boolean;
  addKeyToAgent: boolean;
}
