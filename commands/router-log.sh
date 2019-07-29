. utils/regex.sh
. ssh/ssh.sh

if echo "$1" | Is_Help; then
    echo "Usage: $(basename "$0") [parameters]
 Examples:
  transfer                      Transfers the log
  2019-07-28                    Display all log entries on 2019-07-28
  2019-07-28 top 10             Displays top 10 inbound and outbound blocked requests on 2019-07-28"
    exit 0
fi
skynetlog=/tmp/mnt/USB/skynet/skynet.log

rm -rf tmp
mkdir tmp

if [ "$3" == "transfer" ]; then
    Download $skynetlog tmp/.
    open tmp/skynet.log
    exit 0
fi

if echo "$3" | Is_Date; then date_filter=$(echo "$3" | To_LogDate); else date_filter=$(Todays_LogDate); fi

echo "Fetching log entries on $date_filter
"
Execute "grep '^$date_filter' $skynetlog" >tmp/current.log

if (($# < 4)); then
    cat tmp/current.log
    exit 0

fi

Download /var/lib/misc/dnsmasq.leases tmp/. >/dev/null
Download /tmp/mnt/USB/skynet/skynet.ipset tmp/ >/dev/null
Download /opt/var/log/dnsmasq.log tmp/. >/dev/null

top=${5:-5}

ipset=tmp/skynet.ipset

Strip_Domain() {
    sed 's~http[s]*://~~;s~/.*~~;s~www\.~~g' | awk '!x[$0]++'
}

if [ -f "tmp/dnsmasq.log" ]; then
    grep -hE 'reply.* is ([0-9]{1,3}\.){3}[0-9]{1,3}$' dnsmasq* | awk '{printf "%s %s\n", $6, $8}' | Strip_Domain >tmp/skynetstats.txt
    printf '   \b\b\b'
else
    touch "tmp/skynetstats.txt"
fi

echo "
Analyzing outbound traffic"
echo "
OUTBOUND"
echo "=============================="

grep '.*OUTBOUND' tmp/current.log | grep -oE ' SRC=[0-9,\.]*' | cut -c 6- | sort -n | uniq -c | sort -nr | head -"$top" | while IFS= read -r "statdata"; do
    hits="$(echo "$statdata" | awk '{print $1}')"
    ipaddr="$(echo "$statdata" | awk '{print $2}')"
    localname="$(grep -F "$ipaddr " tmp/dnsmasq.leases | awk '{print $4}')"
    if [ -z "$localname" ]; then
        localname="$model"
    elif [ -z "$localname" ]; then
        localname="Unknown"
    fi
    printf "%-10s | %-16s | %-60s\\n" "${hits}x" "${ipaddr}" "$localname"
done

echo "
Analyzing inbound traffic"
echo "
INBOUND"
echo "=============================="
grep '.*INBOUND' tmp/current.log | grep -oE ' SRC=[0-9,\.]*' | cut -c 6- | sort -n | uniq -c | sort -nr | head -"$top" | while IFS= read -r "statdata"; do
    hits="$(echo "$statdata" | awk '{print $1}')"
    ipaddr="$(echo "$statdata" | awk '{print $2}')"

    country="($(curl -fsL --retry 3 "https://ipapi.co/$ipaddr/country/"))"

    banreason="$(grep -F " ${ipaddr} " "$ipset" | awk -F "\"" '{print $2}')"
    if [ -z "$banreason" ]; then
        banreason="$(grep -m1 -E "$(echo "$ipaddr" | cut -d '.' -f1-3)..*/" "$ipset" | awk -F "\"" '{print $2}')*"
    fi
    if [ "${#banreason}" -gt "45" ]; then banreason="$(echo "$banreason" | cut -c 1-45)"; fi
    printf "%-10s | %-15s %-4s | %-55s | %-45s | %-60s\\n" "${hits}x" "${ipaddr}" "${country}" "https://otx.alienvault.com/indicator/ip/${ipaddr}" "$banreason" "$(grep -F "$ipaddr" tmp/skynetstats.txt | awk '{print $1}' | xargs)"
done
