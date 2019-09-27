export interface SshConfig {
  host: string;
  userName: string;
  privateKey: string;
}

export const empty: SshConfig = {
  host: "n/a",
  privateKey: "n/a",
  userName: "n/a"
};

export const sshConfig = (fields?: Partial<SshConfig>): SshConfig => ({
  ...empty,
  ...fields
});

export default {
  create: sshConfig,
  empty
};
