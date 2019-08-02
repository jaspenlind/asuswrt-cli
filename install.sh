#!/bin/bash
PACKAGE_DIR=$(mktemp -d)
cd "$PACKAGE_DIR" || exit

echo "asuswrt-cli installer"
echo "==================="
echo "==> Downloading package…"
git clone "https://github.com/jaspenlind/asuswrt-cli.git"

echo "==> Starting setup…"

asuswrt-cli/script/setup

rm -rf "$PACKAGE_DIR"

echo "Type \""router -h\"" to start using the cli"
