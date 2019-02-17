#!/bin/sh

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

# We mount a directory for /home/node to get around permissions problems. If we
# had mounted /home/node/utiljs without mounting a directory for /home/node,
# then the root user would own /home/node preventing us from writing to it.
NODE_HOME_DIR="${SCRIPT_DIR}"/../target/node-home-dir

mkdir -p "${NODE_HOME_DIR}"

docker run \
--interactive \
--rm \
--tty \
--volume "${NODE_HOME_DIR}":/home/node \
--volume "${SCRIPT_DIR}"/..:/home/node/utiljs \
--workdir /home/node/utiljs \
creemama/run-non-root:1.4.0-node \
sh
