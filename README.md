# router

Proxy script for executing Skynet commands on the router

## Requirements

Create a `.ssh.config` file in this directory

```bash
host="yourrouteraddress"
username="usernameonyourrouter"
privateKey="/path/to/your/ssh/key/file"
passphrase="passphraseofyourprivatekey"
```

## Usage

```bash
usage: router terminal              | Opens an ssh connection to the router
       router firewall [args...]    | Executes the Skynet firewall with the given arguments
       router log show              | Displays the stats log
       router log show inbound      | Displays top 5 inbound blocked connections
       router log show outbound     | Displays top 5 outbound blocked connections
       router log transfer          | Transfers the debug log
       router upload <src> <dest>   | Transfers the given source file to the given destination
```
