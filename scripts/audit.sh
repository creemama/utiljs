#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

exitCode=0
npm audit
echo && echo
cd packages
for package in */; do
	cd ${package}
	# https://stackoverflow.com/a/42449998
	echo -e "\033[1mVisting ${package}\033[0m"
	npm audit
	latestExitCode=${?}
	if [[ ${latestExitCode} -ne 0 ]]; then
		exitCode=${latestExitCode}
	fi
	echo && echo
	cd ..
done

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
