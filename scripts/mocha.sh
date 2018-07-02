#!/bin/sh

curDir=`pwd`
scriptDir=`dirname "${0}"`
cd "${scriptDir}"

cd ..

# Put mocha on the PATH.
PATH=`pwd`/node_modules/.bin:$PATH

exitCode=0
if [ ! -z "${1}" ] && [ -d "packages/${1}" ]; then
	cd "packages/${1}"
	mocha **/*Test.js
	exitCode=${?}
else
	cd packages
	for package in */; do
		cd ${package}
		if [[ $(find . -type f | egrep ".*Test.js" | wc -l) -ne 0 ]]; then
			echo "Visting ${package}"
			mocha ${@} **/*Test.js
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
