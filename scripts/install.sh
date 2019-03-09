#!/bin/sh

scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

npm install --save-exact
exitCode=${?}
npx lerna bootstrap -- --save-exact
if [ ${?} -ne 0 ]; then
  exitCode=${?}
fi

printf "\n\033[1m%s\033[0m\n\n" "** Consider running \"npm run package-lock\" as well. **"

echo "Exit code: ${exitCode}"
exit ${exitCode}
