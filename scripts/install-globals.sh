#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

# We use these global packages to run in Travis CI.

# Including @babel/core prevents the following warning:
# npm WARN @babel/cli@7.2.3 requires a peer of @babel/core@^7.0.0-0 but
# none is installed. You must install peer dependencies yourself.

npm install --global npm@6.9.0
npm install --global \
  @babel/cli@7.4.4 \
  @babel/core@7.4.4 \
  lerna@3.13.4 \
  mocha@6.1.4
