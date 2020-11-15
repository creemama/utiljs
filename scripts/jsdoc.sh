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

if [ -d "target/jsdoc" ]; then
	rm -rf target/jsdoc
fi

path="."
prefix=""
if [ -n "${1:-}" ] && [ -d "packages/${1}" ]; then
	path="./packages/${1}"
	prefix="\./packages/${1}/"
fi

jsdoc \
	--destination target/jsdoc \
	$(find "${path}" -type f |
		grep -E "^${prefix}.*\.js$" |
		grep -E -v "^.*/(dist|node_modules|target)/.*$")
