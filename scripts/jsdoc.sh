#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

if [ -d "target/jsdoc" ]; then
  rm -rf target/jsdoc
fi

path="."
prefix=""
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
  path="./packages/${1}"
  prefix="\./packages/${1}/"
fi

jsdoc \
--destination target/jsdoc \
`find ${path} -type f \
| egrep "^${prefix}.*\.js$" \
| egrep -v "^.*/(dist|node_modules|target)/.*$"`

cd "${curDir}"
