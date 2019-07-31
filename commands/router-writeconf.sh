#!/bin/bash

. ssh/ssh.sh

if [ -f "$config" ]; then
    read -r -p "A SSH config file ($config) does already exist. Overwrite? [y/N]: " overwrite
    if [ "$overwrite" != "y" ]; then
        exit 1
    fi
fi

read -r -p 'Router address [192.168.1.1]: ' host
host=${host:-192.168.1.1}
read -r -p 'User name [admin]: ' username
username=${username:-admin}
read -r -p 'SSH private key file [~/.ssh/id_rsa]: ' privateKey
privateKey=${privateKey:-${HOME}/.ssh/id_rsa}

if [ ! -f "$privateKey" ]; then
    echo "The key file $privateKey does not exist. Generate a new key with ssh-keygen"
fi

read -r -sp "Passphrase for private key: " passphrase

{
    echo host=\""$host\""
    echo username=\""$username\""
    echo privateKey=\""$privateKey\""
    echo passphrase=\""$passphrase\""
} >$config

echo "
New SSH configuration was written to $config"
