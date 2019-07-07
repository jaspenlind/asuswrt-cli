# skynet-tools

- A set of tools for the Skynet ASUS firewall (<https://github.com/Adamm00/IPSet_ASUS).>

## Requirements

- SSH
- NodeJS
- An ASUS Router with Skynet installed

## Tools

### vpn-whitelist-importer

This tool will fetch all Swedish server addresses from NordVPN, copy them to the router and whitelist them in the Skynet firewall.

#### Usage

```bash
sudo bash ./install.sh <yourrouterusername>@<yourrouteraddress>
```
