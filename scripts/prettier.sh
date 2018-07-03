#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

find . -type f \
| egrep "^.*\.(css|js|json|md|scss)$" \
| egrep -v "^.*/(node_modules|target)/.*$" \
| egrep -v "^.*/package-lock\.json$" \
| egrep -v "^\./lerna\.json$" \
> prettier.txt

while read in; do npx prettier --write "$in"; done < prettier.txt

rm -rf prettier.txt

cd "${curDir}"
