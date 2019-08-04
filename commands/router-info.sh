#!/bin/bash
set -e

. ssh/ssh.sh
. utils/regex.sh
. utils/stringformat.sh
. utils/messages.sh

commands=(
    "uptime!!uptime!!Display router uptime"
    "cpuinfo!!cat /proc/cpuinfo!!Display cpu info"
    "version!!cat /proc/version!!Firmware version"
    "nvram!!nvram show!!NVRAM settings"
    "mount!!mount!!Display mounted drives"
    "commands!!ls -1 /usr/bin/ | grep -v '^d'!!Lists files in /usr/bin"
)

command="${1:-2}"

Help() {
    Usage "info" "${commands[@]}"
}

if echo "$command" | Is_Help; then
    Help
    exit 0
fi

command=$(GetCommandByName "$2" "${commands[@]}")

if [ -n "$command" ]; then
    Execute "$command"
else
    Illegal_Option
    Help
    Exit 1
fi
