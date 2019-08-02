#!/bin/bash

. utils/regex.sh
. ssh/ssh.sh

if echo "$1" | Is_Help; then
    echo "Usage: $(basename "$0") [parameters]
 where parameters = any command described here: https://github.com/Adamm00/IPSet_ASUS/blob/master/README.md"
    exit 0
fi

Execute sh /jffs/scripts/firewall "${*/firewall/}"
