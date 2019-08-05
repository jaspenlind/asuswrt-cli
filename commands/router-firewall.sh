#!/bin/sh

. "$ROOT_PATH/utils/regex.sh"
. "$ROOT_PATH/ssh/ssh.sh"
. "$ROOT_PATH/utils/stringformat.sh"

if echo "$1" | Is_Help; then
  printf "Usage: router %b options
  Use commands described here: https://github.com/Adamm00/IPSet_ASUS/blob/master/README.md
" "$(italic "firewall")"
  exit 0
fi

Execute "sh /jffs/scripts/firewall ${*:2}"
