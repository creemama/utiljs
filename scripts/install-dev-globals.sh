#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

# We do not need these global packages to run in Travis CI.

npm install --global \
  eslint@6.1.0 \
  eslint-config-prettier@6.0.0 \
  jsdoc@3.6.3 \
  jsdoc-to-markdown@5.0.0 \
  nyc@14.1.1 \
  prettier@1.18.2
