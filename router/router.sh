arg="$1"

ShowHelp() {
    echo "usage: router                       | Opens an ssh connection to the router"
    echo "       router firewall [args...]    | Executes the Skynet firewall with the given arguments"
    echo "       router log show              | Displays the stats log"
    echo "       router log show inbound      | Displays top 5 inbound blocked connections"
    echo "       router log show outbound     | Displays top 5 outbound blocked connections"
    echo "       router log transfer          | Transfers the debug log"
    echo "       router upload <src> <dest>   | Transfers the given source file to the given destination"
    exit 0
}
if [ "$arg" = "-h" ] || [ "$arg" = "--help" ]; then
    ShowHelp
fi

. .ssh.config

transfer=0
upload=0
scripts="/jffs/scripts"
firewall="$scripts/firewall"
stats="$scripts/firewall-stats"
tmp="/tmp/mnt/USB/skynet"

if [ "$1" = "log" ] && [ "$2" = "show" ] && [ "$3" = "inbound" ]; then
    arg="$stats top 5 INBOUND"
elif [ "$1" = "log" ] && [ "$2" = "show" ] && [ "$3" = "outbound" ]; then
    arg="$stats top 5 OUTBOUND"
elif [ "$1" = "log" ] && [ "$2" = "show" ]; then
    arg="$firewall stats"
elif [ "$1" = "firewall" ]; then
    arg="$firewall ${@:2}"
elif [ "$1" = "upload" ]; then
    upload=1
elif [ "$1" = "log" ] && [ "$2" = "transfer" ]; then
    transfer=1
    arg="$tmp/skynet.log"
else
    arg="$@"
fi

if [ "$upload" -eq 1 ]; then
    scp -i $key $2 $host:$3
elif [ "$transfer" -eq 1 ]; then
    scp -i $key $host:$arg .
else
    ssh -i $key $host $arg
fi
