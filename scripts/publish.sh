#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Log into https://www.npmjs.com .
git clean -f \
&& npm run clean \
&& npm run build \
&& npm adduser \
&& npx lerna publish
exitCode=${?}

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
