#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Put jsdoc on the PATH.
PATH=`pwd`/node_modules/.bin:$PATH

if [ -d "target/jsdoc2md" ]; then
  rm -rf target/jsdoc2md
fi

mkdir -p target/jsdoc2md

path="."
prefix=""
filename="jsdoc2md.md"
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
  path="./packages/${1}"
  prefix="\./packages/${1}/"
  filename="${1}.md"
fi

jsdoc2md \
`find ${path} -type f \
| egrep "^${prefix}.*\.js$" \
| egrep -v "^.*/(dist|node_modules|target)/.*$"` \
> target/jsdoc2md/${filename}

cd "${curDir}"
