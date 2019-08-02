#!/bin/bash
export LC_CTYPE=C

config="ssh/.ssh.config"

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

passphrase=$(
    tr </dev/urandom -dc '12345!@#$%qwertQWERTasdfgASDFGzxcvbZXCVB' | head -c8
    echo ""
)

read -r -sp "Passphrase for private key [$passphrase]: " passphraseinput
passphrase=${passphraseinput:-$passphrase}
{
    echo host=\""$host\""
    echo username=\""$username\""
    echo privateKey=\""$privateKey\""
    echo passphrase=\""$passphrase\""
} >$config

echo "
New SSH configuration was written to $config"

if [ ! -f "$privateKey" ]; then
    read -r -p "The key file $privateKey does not exist. Do you want to create it? [Y/n]" createprivkey
    createprivkey=${createprivkey:-y}

    if [ "$createprivkey" == 'y' ]; then
        ssh-keygen -f "$privateKey" -P "$passphrase"
    fi
fi

read -r -p "Do you want to add the key $privateKey to the SSH Agent? [Y/n]" addtoagent
addtoagent=${addtoagent:-y}

if [ "$addtoagent" == "y" ]; then
    ssh-add "$privateKey"
fi

echo "The access the router from the CLI you need to enable SSH."
echo "1. Open the router web interface and go to Administration / System"
echo "2. Set Enable SSH to 'LAN Only'"
echo "3. Set Allow Password Login to 'No'"
echo "4. Paste to content of '$privateKey.pub' in the Authorized Keys field"
echo "5. Click Apply"
