#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

exitCode=0
npm outdated
cd packages
for package in */; do
	cd ${package}
	echo "Visting ${package}"
	npm outdated
	latestExitCode=${?}
	if [[ ${latestExitCode} -ne 0 ]]; then
		exitCode=${latestExitCode}
	fi
	cd ..
done

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
