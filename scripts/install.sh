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

npm install --save-exact
lerna bootstrap -- --save-exact

printf "\n\033[1m%s\033[0m\n\n" "** Consider running \"npm run package-lock\" as well. **"
