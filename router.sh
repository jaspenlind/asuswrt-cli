#!/bin/bash

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

args="$*"
command="$1"

. utils/regex.sh

if [ "$args" == "-h" ]; then
    DisplayUsage
    exit 0
elif echo "$args" | Is_Log; then
    command=log
elif echo "$args" | Is_Help; then
    command="$2"
fi

command=./commands/router-$command.sh

if [ ! -f "$command" ]; then
    DisplayUsage
    exit 1
fi

$command "$@"
