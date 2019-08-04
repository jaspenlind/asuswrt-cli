#!/bin/bash
###########################################################################
#                                                                         #
#                    _ \   _ \  |   |__ __| ____|  _ \                    #
#                   |   | |   | |   |   |   __|   |   |                   #
#                   __ <  |   | |   |   |   |     __ <                    #
#                  _| \_\\___/ \___/   _|  _____|_| \_\                   #
#                                                                         #
#                            ___| |    _ _|                               #
#                           |     |      |                                #
#                           |     |      |                                #
#                          \____|_____|___|                               #
#                                                                         #
#                   ASUS Router Command Line Interface                    #
#                https://github.com/jaspenlind/asuswrt-cli                #
###########################################################################

clear
sed -n '2,17p' "$0"

. utils/regex.sh
. utils/messages.sh

Help() {
    Usage "" " terminal                Opens an ssh connection to the router
 info                    Shows router information
 job                     Handle cron jobs
 lan                     Handle lan options
 firewall                Executes the Skynet firewall with the given arguments
 firewall log            Copy or analyze firewall log
 firewall vpn whitelist  Whitelists vpn servers
 writeconf               Generate SSH config
                     
Help options:
 -h                        Show this help screen about the tool
 -h terminal               Terminal options
 -h info                   Information options
 -h job                    Job options
 -h lan                    LAN options
 -h firewall               Firewall options
 -h firewall log           Firewall logging options
 -h net                    Network options
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

if [ "$args" == "-h" ]; then
    Help
    exit 0
elif echo "$args" | Is_Log; then
    command="log"
elif echo "$args" | grep -qE 'firewall vpn whitelist'; then
    command="firewall-whitelist"
elif echo "$args" | Is_Help; then
    command="$2"
fi

if [ -z "$command" ]; then command="terminal"; fi

command="commands/router-$command.sh"

if [ ! -f "$command" ]; then
    Help
    exit 1
fi

$command "$@"
