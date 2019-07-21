# log-exporter

The purpose of this tool is to export and analyze logs from the Skynet firewall.

## Requirements

- An ASUS Router with [Skynet](https://github.com/Adamm00/IPSet_ASUS) installed
- [nodejs](https://nodejs.org/)
- [device-blocks](https://github.com/jaspenlind/IPSet_ASUS/blob/datefilter/device-blocks.sh) installed to the same directory as Skynet

## SSH settings

Create a .ssh.js file and fill out your ssh settings for the Skynet host.

```json
module.exports = {
  host: "",
  username: "",
  privateKey: "",
  passphrase: ""
};
```

The tool is using [node-ssh](https://www.npmjs.com/package/node-ssh) to connect to the remote host.
The settings in .ssh.js reflects the settings passed to `ssh.connect(givenConfig);`

## Usage

```bash
node index.js 2019-07-18

Device blocks 2019-07-18
========================
11x        | 192.168.1.95     | computer1
9x         | 192.168.1.17     | server1
```
