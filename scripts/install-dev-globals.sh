#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

# We do not need these global packages to run in Travis CI.

npm install --global \
  eslint@7.13.0 \
  jsdoc@3.6.6 \
  jsdoc-to-markdown@6.0.1 \
  nyc@15.1.0 \
  prettier@2.1.2
