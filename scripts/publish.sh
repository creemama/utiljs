#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Log into https://www.npmjs.com .

# To create scoped packages, create an organization at https://www.npmjs.com.

git clean -f \
&& npm run clean \
&& npm run build \
&& npm login --scope=@util.js \
&& npx lerna publish --exact
exitCode=${?}

# You may need to use --force-publish, an intentionally undocumented option.
# npx lerna publish --exact --force-publish=utiljs-objects,utiljs-strings

npm run package-lock
lastExitCode="${?}"
if [[ "${lastExitCode}" -ne 0 ]]; then
  exitCode="${lastExitCode}"
fi

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
