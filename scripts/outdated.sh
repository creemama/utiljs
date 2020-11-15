#!/bin/sh

set -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
	set -o pipefail
fi

script_dir="$(
	cd "$(dirname "$0")" || exit
	pwd -P
)"
cd "${script_dir}/.." || exit

exit_code=0
npm outdated -g
npm outdated
cd packages || exit
for package in */; do
	(
		cd "${package}" || exit
		echo "Visting ${package}"
		npm outdated
	)
	latest_exit_code=${?}
	if [ ${latest_exit_code} -ne 0 ]; then
		exit_code=${latest_exit_code}
	fi
done

exit ${exit_code}
