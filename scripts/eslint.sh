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
  | egrep "^${prefix}.*\.js$" \
  | egrep -v "^.*/(dist|node_modules|target)/.*$" \
  > target/eslint.txt

sort target/eslint.txt -o target/eslint.txt

while read in; do
  echo $in
  eslint "$in"
done < target/eslint.txt

rm -rf target/eslint.txt
