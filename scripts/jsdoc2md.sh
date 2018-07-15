#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Put jsdoc on the PATH.
PATH=`pwd`/node_modules/.bin:$PATH

if [ -f "target/jsdoc2md.md" ]; then
  rm -rf target/jsdoc2md.md
fi

prefix=""
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
  prefix="\./packages/${1}/"
fi

jsdoc2md \
`find . -type f \
| egrep "^${prefix}.*\.js$" \
| egrep -v "^.*/(dist|node_modules|target)/.*$"` \
> target/jsdoc2md.md

cd "${curDir}"
