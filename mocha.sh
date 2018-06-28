#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

exitCode=0
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
	cd "packages/${1}"
	npm run mocha
	exitCode=${?}
else
	cd packages
	for package in */; do
		cd ${package}
		if [[ $(find . -type f | egrep ".*Test.js" | wc -l) -ne 0 ]]; then
			echo "Visting ${package}"
			npm run mocha ${@}
			latestExitCode=${?}
			if [[ ${latestExitCode} -ne 0 ]]; then
				exitCode=${latestExitCode}
			fi
		else
			echo "Skipping ${package}"
			echo
		fi
		cd ..
	done
fi

cd "${curDir}"

echo "Exit code: ${exitCode}"
exit ${exitCode}
