#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

script_dir="$( cd "$(dirname "$0")" ; pwd -P )"
cd "${script_dir}/.."

if [ ! -z "${1:-}" ] && [ -d "packages/${1}" ]; then
	cd "packages/${1}"
	mocha
else
	cd packages
	for package in */; do
		cd ${package}
		if [ -d "test" ]; then
			echo "Visting ${package}"
			mocha ${@}
		else
			echo "Skipping ${package}"
			echo
		fi
		cd ..
	done
fi
