#!/bin/bash
. utils/messages.sh
. utils/regex.sh
. utils/stringformat.sh

if echo "$1" | Is_Help; then
    Usage "terminal" " where parameters = any router command"
    exit 0
fi

. ssh/ssh.sh

args="${*:2}"

printf "Opening terminal\n\n"

if [ -n "$args" ]; then
    printf "Executing \"%s\"\n\n" "$args"
fi

Execute "$args"
