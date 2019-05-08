#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

# We do not need these global packages to run in Travis CI.

npm install --global \
  eslint@5.16.0 \
  eslint-config-prettier@4.2.0 \
  jsdoc@3.6.1 \
  jsdoc-to-markdown@4.0.1 \
  nyc@14.1.0 \
  prettier@1.17.0
