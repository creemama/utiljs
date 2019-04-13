#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

# We do not need these global packages to run in Travis CI.

npm install --global \
  eslint@5.16.0 \
  eslint-config-prettier@4.1.0 \
  jsdoc@3.5.5 \
  jsdoc-to-markdown@4.0.1 \
  prettier@1.17.0
