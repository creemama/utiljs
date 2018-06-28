#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

npm install
exitCode=${?}
npm run lerna bootstrap
if [[ ${?} -ne 0 ]]; then
  exitCode=${?}
fi

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
