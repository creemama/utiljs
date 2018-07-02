#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

npm install --save-exact
exitCode=${?}
npx lerna bootstrap -- --save-exact
if [[ ${?} -ne 0 ]]; then
  exitCode=${?}
fi

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
