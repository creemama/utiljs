#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
	set -o pipefail
fi

script_dir="$(
	cd "$(dirname "$0")"
	pwd -P
)"
cd "${script_dir}/.."

npm run clean
./scripts/install.sh
git status
npm run build
./scripts/mocha.sh
git push origin master:update --force
