#!/bin/sh
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

script_path="$(readlink "$0")"

if [ -z "$script_path" ]; then script_path="$0"; fi

export readonly ROOT_PATH

ROOT_PATH="$(
  cd "$(dirname "$script_path")" || exit
  pwd -P
)"

. "$ROOT_PATH/utils/regex.sh"
. "$ROOT_PATH/utils/messages.sh"

help() {
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

args="$*"
command="$1"

if [ "$args" = "-h" ]; then
  help
  exit 0
elif echo "$args" | Is_Log; then
  command="log"
elif echo "$args" | grep -qE 'firewall vpn whitelist'; then
  command="firewall-whitelist"
elif echo "$args" | Is_Help; then
  command="$2"
fi

if [ -z "$command" ]; then command="terminal"; fi

command="$ROOT_PATH/commands/router-$command.sh"

if [ ! -f "$command" ]; then
  help
  exit 1
fi

"$command" "$@"
