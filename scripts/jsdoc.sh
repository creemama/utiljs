#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Put jsdoc on the PATH.
PATH=`pwd`/node_modules/.bin:$PATH

if [ -d "target/jsdoc" ]; then
  rm -rf target/jsdoc
fi

prefix=""
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
  prefix="\./packages/${1}/"
fi

jsdoc \
--destination target/jsdoc \
`find . -type f \
| egrep "^${prefix}.*\.js$" \
| egrep -v "^.*/(dist|node_modules|target)/.*$"`

cd "${curDir}"
