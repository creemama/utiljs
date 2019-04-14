#!/bin/sh

set -o errexit -o nounset
IFS="$(printf '\n\t' '')"
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

DOCKER_IMAGE=utiljs-dev:0.36.1

# https://stackoverflow.com/a/30543453
if [[ "$(docker images -q ${DOCKER_IMAGE} 2> /dev/null)" == "" ]]; then
  cp "${SCRIPT_DIR}/install-dev-globals.sh" "${SCRIPT_DIR}/../docker"
  cp "${SCRIPT_DIR}/install-globals.sh" "${SCRIPT_DIR}/../docker"
  cd "${SCRIPT_DIR}/../docker"
  if ! docker build --tag ${DOCKER_IMAGE} .; then
    exit "${?}"
  fi
  rm "${SCRIPT_DIR}/../docker/install-dev-globals.sh" \
    "${SCRIPT_DIR}/../docker/install-globals.sh"
fi

# We mount /tmp because of the following error:
# ~/utiljs $ ./scripts/jsdoc2md.sh
# /home/node/utiljs/node_modules/mkdirp2/index.js:87
#           throw err0
#           ^
#
# Error: EROFS: read-only file system, mkdir '/tmp/jsdoc-api'
#     at Object.mkdirSync (fs.js:753:3)
# ...

# /home/node/.gnupg cannot be read-only because of the following error:
# ~/utiljs $ git commit
# error: gpg failed to sign the data
# fatal: failed to write commit object

docker run \
  --cap-drop=ALL \
  --cpu-shares=1024 \
  --interactive \
  --memory 1.5G \
  --name utiljs-dev \
  --pids-limit 100 \
  --read-only \
  --restart=no \
  --rm \
  --security-opt=no-new-privileges:true \
  --tty \
  --volume /home/node \
  --volume ~/.gnupg:/home/node/.gnupg \
  --volume ~/.ssh:/home/node/.ssh:ro \
  --volume "${SCRIPT_DIR}/..:/home/node/utiljs" \
  --volume /tmp \
  --workdir /home/node/utiljs \
  "${DOCKER_IMAGE}"
