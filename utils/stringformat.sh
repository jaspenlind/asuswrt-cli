#!/bin/bash
ansi() { echo "\e[${1}m${*:2}\e[0m"; }
bold() { ansi 1 "$@"; }
italic() { ansi 3 "$@"; }
underline() { ansi 4 "$@"; }
strikethrough() { ansi 9 "$@"; }

ToArray() {
    local name="${1:-returned_array}"
    local -a arr=()
    # read each input and add it to arr
    while read -r line; do
        arr[${#arr[@]}]="$line"
    done

    # output the array as a string in the "declare" representation
    test=$(declare -p arr | sed -e 's/^declare -a [^=]*=//')

    echo "declare -a $name=${test}"
}

Split() {
    local str="$1"
    local delimiter="$2"
    local s="$str$delimiter"

    while [[ $s ]]; do
        echo "${s%%"$delimiter"*}"
        s=${s#*"$delimiter"}
    done
}
