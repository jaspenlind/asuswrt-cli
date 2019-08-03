#!/bin/bash
. utils/stringformat.sh

if [ "$1" == "-h" ]; then
    printf "Usage: router %b [parameters]
  where parameters = any command
" "$(italic "terminal")"
    exit 0
fi

. ssh/ssh.sh

args="${*:2}"

printf "Opening terminal\n\n"

if [ -n "$args" ]; then
    printf "Executing \"%s\"\n\n" "$args"
fi

Execute "$args"
