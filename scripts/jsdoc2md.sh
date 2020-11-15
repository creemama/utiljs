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

if [ -d "target/jsdoc2md" ]; then
	rm -rf target/jsdoc2md
fi

mkdir -p target/jsdoc2md

path="."
prefix=""
filename="jsdoc2md.md"
if [ -n "${1:-}" ] && [ -d "packages/${1}" ]; then
	path="./packages/${1}"
	prefix="\./packages/${1}/"
	filename="${1}.md"
fi

jsdoc2md \
	$(find "${path}" -type f |
		grep -E "^${prefix}.*\.js$" |
		grep -E -v "^.*/(dist|node_modules|target)/.*$") \
	>"target/jsdoc2md/${filename}"
