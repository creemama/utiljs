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

npm install --global npm@6.10.2
npm install --global \
  @babel/cli@7.5.5 \
  @babel/core@7.5.5 \
  lerna@3.16.4 \
  mocha@6.2.0
