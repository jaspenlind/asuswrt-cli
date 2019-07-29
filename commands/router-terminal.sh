if [ "$1" == "-h" ]; then
    echo "Usage: $(basename "$0") terminal [parameters]
 where parameters = any bash command"
    exit 0
fi

. ssh/ssh.sh

Execute ${@:2}
