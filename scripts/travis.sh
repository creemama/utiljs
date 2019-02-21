#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

npm run clean \
&& ./scripts/install.sh \
&& git status \
&& npm run build \
&& ./scripts/mocha.sh \
&& git push origin master:update
exitCode=${?}

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
