# asuswrt-cli

ASUS Router CLI

## Installation

```shell
curl -sSL "https://raw.githubusercontent.com/jaspenlind/asuswrt-cli/master/install.sh" | bash
```

## Usage

```Shell
Usage: router options [parameters]
                     terminal                Opens an ssh connection to the router
                     firewall                Executes the Skynet firewall with the given arguments
                     firewall log            Copy or analyze firewall log
                     writeconf               Generate SSH config

Help options:
 -h                                          Show this help screen about the tool
 -h terminal                                 Terminal options
 -h firewall                                 Firewall options
 -h firewall log                             Firewall logging options
 -h net                                      Network options
```
