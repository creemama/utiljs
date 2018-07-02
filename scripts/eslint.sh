#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Put eslint on the PATH.
PATH=`pwd`/node_modules/.bin:$PATH

find . -type f \
| egrep "^.*\.js$" \
| egrep -v "^.*/(node_modules|target)/.*$" \
> eslint.txt

while read in; do
  echo $in
  npx eslint "$in"
done < eslint.txt

rm -rf eslint.txt

cd "${curDir}"
