#!/bin/bash
PACKAGE_DIR=$(mktemp -d)
cd "$PACKAGE_DIR" || exit

echo "asuswrt-cli installer"
echo "==================="
echo "==> Downloading package…"
curl -sSL --fail "https://github.com/jaspenlind/asuswrt-cli/archive/master.zip" -o "setup.zip"
tar -xf "setup.zip" --strip-components=1

echo "==> Starting setup…"

script/setup

rm -rf "$PACKAGE_DIR"

echo "Type \""router -h\"" to start using the cli"
