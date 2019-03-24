#!/bin/sh

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

# We mount a directory for /home/node to get around permissions problems. If we
# had mounted /home/node/utiljs without mounting a directory for /home/node,
# then the root user would own /home/node preventing us from writing to it.
NODE_HOME_DIR="${SCRIPT_DIR}"/../target/node-home-dir

mkdir -p "${NODE_HOME_DIR}"

DOCKER_IMAGE=utiljs-dev:0.36.0

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

docker run \
--interactive \
--name utiljs-dev \
--read-only \
--rm \
--tty \
--volume "${NODE_HOME_DIR}":/home/node \
--volume ~/.ssh:/home/node/.ssh:ro \
--volume "${SCRIPT_DIR}"/..:/home/node/utiljs \
--volume /tmp \
--workdir /home/node/utiljs \
${DOCKER_IMAGE}
