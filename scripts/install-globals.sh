#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

# We use these global packages to run in Travis CI.

npm install --global npm@6.9.0 \
&& npm install --global \
  lerna@3.13.2 \
  mocha@6.1.3
