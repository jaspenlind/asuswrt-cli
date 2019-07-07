if [ -z "$1" ]
  then
    echo "Usage: sudo bash ./install.sh <username>@<host>"
fi

LIST="vpn-whitelist-se.txt"
TOOLDIR="/jffs/skynet-tools"

echo Skynet VPN whitelist importer started.
echo installing node modules
npm install

echo generating $LIST
node create-vpn-whitelist-se.js

echo Connecting to $1
ssh $1 "mkdir -p $TOOLDIR"
echo Copying $LIST to $1
scp $LIST $1:/$TOOLDIR
echo Importing $LIST to Skynet
ssh $1 "sh /jffs/scripts/firewall import whitelist $TOOLDIR/$LIST NordVPN"
echo Done