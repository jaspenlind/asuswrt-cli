#!/bin/bash
. "$ROOT_PATH/utils/messages.sh"
. "$ROOT_PATH/utils/regex.sh"
. "$ROOT_PATH/utils/stringformat.sh"
. "$ROOT_PATH/ssh/ssh.sh"

if echo "$1" | Is_Help; then
    Usage "terminal" " where parameters = any router command"
    exit 0
fi

args="${*:2}"

printf "Opening terminal\n\n"

if [ -n "$args" ]; then
    printf "Executing \"%s\"\n\n" "$args"
fi

Execute "$args"
