#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

find . -type f \
| egrep "^.*\.(css|js|json|md)$" \
| egrep -v "^.*/(node_modules|target)/.*$" \
| egrep -v "^.*/package-lock\.json$" \
> prettier.txt

while read in; do npx prettier --write "$in"; done < prettier.txt

rm -rf prettier.txt

cd "${curDir}"
