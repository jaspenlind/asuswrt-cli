#!/bin/bash
. ssh/ssh.sh

vpn_whitelist="vpnwhitelist.txt"
vpn_src="tmp/$vpn_whitelist"
vpn_dst="/tmp/home/root/$vpn_whitelist"

if [ ! -d "tmp" ]; then mkdir "tmp"; fi

sh ./tools/nordvpn-server-lister/script/run -filter.flag=\"SE\" -output=ip_address -raw >$vpn_src

Upload "$vpn_src" "$vpn_dst"

commands/router-firewall.sh import whitelist $vpn_dst NordVPN

Execute "rm $vpn_dst"

rm "$vpn_src"
