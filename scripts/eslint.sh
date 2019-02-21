#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Put eslint on the PATH.
PATH=`pwd`/node_modules/.bin:$PATH

path="."
prefix=""
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
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
  npx eslint "$in"
done < target/eslint.txt

rm -rf target/eslint.txt

cd "${curDir}"
