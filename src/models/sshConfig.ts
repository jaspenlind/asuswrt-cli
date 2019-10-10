import { SshConfig } from "../types";

export { SshConfig };

export const empty: SshConfig = Object.freeze({
  host: "",
  privateKey: "",
  userName: ""
});

export const create = (fields?: Partial<SshConfig>): SshConfig => ({
  ...empty,
  ...fields
});

export default {
  create,
  empty
};
