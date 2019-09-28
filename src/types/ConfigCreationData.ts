import { SshConfig } from ".";

export default interface ConfigCreationData extends SshConfig {
  passPhrase: string;
  createKeyFile: boolean;
  addKeyToAgent: boolean;
}
