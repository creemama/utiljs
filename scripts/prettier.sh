#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

path="."
prefix=""
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
  path="./packages/${1}"
  prefix="\./packages/${1}/"
fi

mkdir -p target

find ${path} -type f \
| egrep "^(\./\.babelrc|${prefix}.*\.(css|js|json|jsx|md|scss))$" \
| egrep -v "^.*/(dist|node_modules|target)/.*$" \
| egrep -v "^.*/package-lock\.json$" \
| egrep -v "^\./lerna\.json$" \
> target/prettier.txt

sort target/prettier.txt -o target/prettier.txt

while read in; do npx prettier --write "$in"; done < target/prettier.txt

rm -rf target/prettier.txt

cd "${curDir}"
