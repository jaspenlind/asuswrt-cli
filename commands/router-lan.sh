#!/bin/sh
# shellcheck disable=SC2039
. ssh/ssh.sh
. utils/stringformat.sh
. utils/messages.sh
. utils/regex.sh

set -e

Usage() {
    printf "Usage: router %b options [parameters]
 hosts list                        List custom host entries
" "$(italic "lan")"
}

if echo "$1" | Is_Help; then
    Usage "$@"
    exit 0
fi

ListHosts() {
    printf "Listing hosts\n\n"
    Execute "cat /etc/hosts.dnsmasq"
}

if [ "$2" = "hosts" ]; then
    ListHosts
else
    Illegal_Option
    Usage "$@"
fi
