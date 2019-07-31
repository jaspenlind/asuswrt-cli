#!/bin/sh

config=ssh/.ssh.config

if [ ! -f $config ]; then
    echo Missing $config
    exit 1
fi

. ssh/.ssh.config

Execute() {
    ssh -i "$privateKey" "$username@$host" "$@"
}

Download() {
    scp -i "$privateKey" "$username@$host:$1" "$2"
}

Upload() {
    scp -i "$privateKey" "$1" "$username@$host:$2"
}
