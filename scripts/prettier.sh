#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

prefix=""
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
  prefix="\./packages/${1}/"
fi

find . -type f \
| egrep "^${prefix}.*\.(css|js|json|jsx|md|scss)$" \
| egrep -v "^.*/(node_modules|target)/.*$" \
| egrep -v "^.*/package-lock\.json$" \
| egrep -v "^\./lerna\.json$" \
> prettier.txt

sort prettier.txt -o prettier.txt

while read in; do npx prettier --write "$in"; done < prettier.txt

rm -rf prettier.txt

cd "${curDir}"
