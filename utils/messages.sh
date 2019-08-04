#!/bin/bash
. utils/stringformat.sh

Illegal_Params() { printf "Illegal parameters\n\n"; }
Illegal_Option() { printf "Illegal option\n\n"; }

Usage() {
    local command="$1"
    shift
    local cmdOptions=("$@")

    if ! [[ "$(declare -p cmdOptions)" =~ "declare -a" && -n ${cmdOptions[0]} ]]; then
        cmdOptions=(
            "$2"
        )
    fi

    printf "Usage: router"

    if [ -n "$command" ]; then
        printf " %b" "$(italic "$command")"
    fi

    printf " options [parameters]\n"
    for opt in "${cmdOptions[@]}"; do
        if echo "$opt" | Is_Option; then
            echo " $(Option "$opt")"
        else
            echo "$opt"
        fi
    done

    printf "\n"
}

OptionDelimiter="!!"

Is_Option() {
    grep -qE "$OptionDelimiter"
}

Option() {
    local definition="$1"
    local description="$2"

    if echo "$definition" | grep -qE "$OptionDelimiter"; then
        eval "$(Split "${definition}" $OptionDelimiter | ToArray props)"
        # shellcheck disable=SC2154
        definition="${props[0]}"
        description="${props[2]}"
    fi

    printf " %s\t\t\t\t%s\n" "${definition}" "${description}"
}

GetCommandByName() {
    local name
    name="$1"
    shift
    local commands
    commands=("$@")
    local match
    match=$(GetOptionByCommandName "$name" "${commands[@]}")

    if [ -n "$match" ]; then
        eval "$(Split "${match}" $OptionDelimiter | ToArray props)"
        echo "${props[1]}"
    fi
}

GetOptionByCommandName() {
    local e match="$1$OptionDelimiter"
    shift
    for e; do
        if [[ "$e" =~ ^$match ]]; then
            echo "$e"
            break
        fi
    done
}
