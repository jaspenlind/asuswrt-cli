export default interface SshConfig {
  host: string;
  user: string;
  privateKeyFile: string;
  passphrase?: string;
}
