#!/bin/bash

set -e

DisplayUsage() {
    echo "Usage: $(basename "$0") options [parameters]
                     terminal                Opens an ssh connection to the router
                     firewall                Executes the Skynet firewall with the given arguments
                     firewall log            Copy or analyze firewall log
                     writeconf               Generate SSH config
                     
Help options:
 -h        	                             Show this help screen about the tool
 -h terminal                                 Terminal options
 -h firewall                                 Firewall options
 -h firewall log                             Firewall logging options
 -h net                                      Network options
"
}

script_path="$(readlink "$0")"

if [ -z "$script_path" ]; then script_path="$0"; fi

root_dir="$(
    cd "$(dirname "$script_path")" || exit
    pwd -P
)"

cd "$root_dir" || exit

args="$*"
command="$1"

source "utils/regex.sh"

if [ "$args" == "-h" ]; then
    DisplayUsage
    exit 0
elif echo "$args" | Is_Log; then
    command=log
elif echo "$args" | Is_Help; then
    command="$2"
fi

command="commands/router-$command.sh"

if [ ! -f "$command" ]; then
    DisplayUsage
    exit 1
fi

$command "$@"
