#!/bin/bash
# shellcheck disable=SC2039

readonly CRU="cru"

. "$ROOT_PATH/ssh/ssh.sh"
. "$ROOT_PATH/utils/stringformat.sh"
. "$ROOT_PATH/utils/messages.sh"
. "$ROOT_PATH/utils/regex.sh"

help() {
    printf "Usage: router %b options [parameters]
 list                                                    List all jobs
 add <unique id> <\"min hour day month week command\">     Create a new job
 delete <unique id>                                      Delete a job
" "$(italic "job")"
}

list() {
    printf "Listing cron jobs\n\n"
    Execute "$CRU l"
}

add() {
    local id=$1
    local definition=$2

    if [ -z "$id" ] || [ -z "$definition" ]; then
        Illegal_Params
        help "$@"
        exit 1
    fi
    printf "Adding job with id ""%s""\n\n" "$id"
    Execute "$CRU a $id \"$definition\""
}

delete() {
    local id=$1

    if [ -z "$id" ]; then
        Illegal_Params
        Usage "$@"
        exit 1
    fi
    printf "Deleting job with id ""%s""\n\n" "$id"
    Execute "$CRU d $id"
}

if [ -z "$2" ] || echo "$1" | Is_Help; then
    help "$@"
    exit 0
fi

case "$2" in
"list")
    list
    ;;
"add")
    add "$3" "$4"
    list
    printf "\nJob successfully added\n"
    ;;
"delete")
    delete "$3"
    list
    printf "\nJob successfully deleted\n"
    ;;
"*")
    Illegal_Option
    help
    exit 1
    ;;
esac
