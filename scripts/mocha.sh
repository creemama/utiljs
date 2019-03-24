#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

exitCode=0
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
	cd "packages/${1}"
	mocha
	exitCode=${?}
else
	cd packages
	for package in */; do
		cd ${package}
		if [ -d "test" ]; then
			echo "Visting ${package}"
			mocha ${@}
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
