#!/bin/sh
# shellcheck disable=SC2154

readonly CONFIG_FILE="$ROOT_PATH/ssh/.ssh.config"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Missing $CONFIG_FILE"
    exit 1
fi

. "$CONFIG_FILE"

Execute() {
    ssh -i "$privateKey" "$username@$host" "$@"
}

Download() {
    scp -i "$privateKey" "$username@$host:$1" "$2"
}

Upload() {
    scp -i "$privateKey" "$1" "$username@$host:$2"
}
