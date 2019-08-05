#!/bin/bash
set -e

. "$ROOT_PATH/ssh/ssh.sh"
. "$ROOT_PATH/utils/regex.sh"
. "$ROOT_PATH/utils/stringformat.sh"
. "$ROOT_PATH/utils/messages.sh"

commands=(
    "uptime!!uptime!!Display router uptime"
    "cpuinfo!!cat /proc/cpuinfo!!Display cpu info"
    "version!!cat /proc/version!!Firmware version"
    "nvram!!nvram show!!NVRAM settings"
    "mount!!mount!!Display mounted drives"
    "commands!!ls -1 /usr/bin/ | grep -v '^d'!!Lists files in /usr/bin"
)

command="${1:-2}"

help() {
    Usage "info" "${commands[@]}"
}

if echo "$command" | Is_Help; then
    help
    exit 0
fi

command=$(GetCommandByName "$2" "${commands[@]}")

if [ -n "$command" ]; then
    Execute "$command"
else
    Illegal_Option
    help
    exit 1
fi
