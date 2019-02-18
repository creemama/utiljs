#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

npm adduser # Log into https://www.npmjs.com .
if [[ ${?} -eq 0 ]]; then
  npx lerna publish
  if [[ ${?} -eq 0 ]]; then
    exitCode=${?}
  fi
else
  exitCode=${?}
fi

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
