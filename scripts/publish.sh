#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
	set -o pipefail
fi

script_dir="$(
	cd "$(dirname "$0")"
	pwd -P
)"
cd "${script_dir}/.."

# Log into https://www.npmjs.com .

# To create scoped packages, create an organization at https://www.npmjs.com.

git clean -f
npm run clean
npm run build
npm login --scope=@util.js
lerna publish --exact

# You may need to use --force-publish, an intentionally undocumented option.
# lerna publish --exact --force-publish=utiljs-objects,utiljs-strings

npm run package-lock
