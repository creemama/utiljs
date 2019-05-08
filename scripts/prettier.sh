#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

script_dir="$( cd "$(dirname "$0")" ; pwd -P )"
cd "${script_dir}/.."

path="."
prefix=""
if [ ! -z "${1:-}" ] && [ -d "packages/${1}" ]; then
  path="./packages/${1}"
  prefix="\./packages/${1}/"
fi

mkdir -p target

find ${path} -type f \
  | egrep "^(\./\.babelrc|${prefix}.*\.(css|js|json|jsx|md|scss))$" \
  | egrep -v "^.*/(.nyc_output|dist|node_modules|target)/.*$" \
  | egrep -v "^.*/package-lock\.json$" \
  | egrep -v "^\./lerna\.json$" \
  > target/prettier.txt

sort target/prettier.txt -o target/prettier.txt

while read in; do prettier --write "$in"; done < target/prettier.txt

rm -rf target/prettier.txt
