import { SshConfig } from "../types";

export { SshConfig };

export const empty: SshConfig = Object.freeze({
  host: "",
  privateKeyFile: "",
  user: ""
});

export const create = (fields?: Partial<SshConfig>): SshConfig => ({
  ...empty,
  ...fields
});

export default {
  create,
  empty
};
