#!/bin/sh
# shellcheck disable=SC2039
. ssh/ssh.sh
. utils/stringformat.sh
. utils/messages.sh
. utils/regex.sh

Usage() {
    printf "Usage: router %b options [parameters]
 list                                                    List all jobs
 add <unique id> <\"min hour day month week command\">     Create a new job
 delete <unique id>                                      Delete a job
" "$(italic "job")"
}

List() {
    printf "Listing cron jobs\n\n"
    Execute "$CRU l"
}

Add() {
    local id=$1
    local definition=$2

    if [ -z "$id" ] || [ -z "$definition" ]; then
        Illegal_Params
        Usage
        exit 1
    fi
    printf "Adding job with id ""%s""\n\n" "$id"
    Execute "$CRU a $id \"$definition\""
}

Delete() {
    local id=$1

    if [ -z "$id" ]; then
        Illegal_Params
        Usage
        exit 1
    fi
    printf "Deleting job with id ""%s""\n\n" "$id"
    Execute "$CRU d $id"
}

CRU="cru"

if echo "$1" | Is_Help; then
    Usage
    exit 0
fi

case "$2" in
"list")
    List
    ;;
"add")
    Add "$3" "$4"
    List
    printf "\nJob successfully added\n"
    ;;
"delete")
    Delete "$3"
    List
    printf "\nJob successfully deleted\n"
    ;;
"*")
    Illegal_Option
    Usage
    exit 1
    ;;
esac
