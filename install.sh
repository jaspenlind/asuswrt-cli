#!/bin/bash
set -e
readonly PACKAGE_DIR="$(mktemp -d)"
cd "$PACKAGE_DIR"

echo "asuswrt-cli installer"
echo "====================="

curl -sSL "https://git.io/dependency-installer.sh" | bash

echo "==> Downloading packages…"
git clone "https://github.com/jaspenlind/asuswrt-cli.git"
mkdir "asuswrt-cli/tools"
git clone "https://github.com/jaspenlind/nordvpn-server-lister.git" "$PACKAGE_DIR/asuswrt-cli/tools/nordvpn-server-lister"

echo "==> Starting setup…"

"$PACKAGE_DIR/asuswrt-cli/script/setup"

rm -rf "$PACKAGE_DIR"

echo "Type \""router -h\"" to start using the cli"
