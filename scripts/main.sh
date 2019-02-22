#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

main () {
  # `dirname "${0}"` is the script directory.
  cd "`dirname "$0"`"
  eval "$@"
}
