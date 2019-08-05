#!/bin/sh
# shellcheck disable=SC2039

set -e

. "$ROOT_PATH/ssh/ssh.sh"
. "$ROOT_PATH/utils/stringformat.sh"
. "$ROOT_PATH/utils/messages.sh"
. "$ROOT_PATH/utils/regex.sh"

help() {
    printf "Usage: router %b options [parameters]
 hosts list                        List custom host entries
" "$(italic "lan")"
}

if [ -z "$2" ] || echo "$1" | Is_Help; then
    help
    exit 0
fi

list_hosts() {
    printf "Listing hosts\n\n"
    Execute "cat /etc/hosts.dnsmasq"
}

if [ "$2" = "hosts" ]; then
    list_hosts
else
    Illegal_Option
    help
fi
