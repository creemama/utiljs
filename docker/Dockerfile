# This is a development container. To use this container, run:
# ../scripts/docker.sh

FROM creemama/shellutil-dev:18.12.1-alpine3.16

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# I got /dev/console from https://hub.docker.com/r/vladgh/gpg/ .
ENV GPG_TTY=/dev/console

# These dependencies are only necessary for linux/arm64/v8.
RUN apk add --no-cache --virtual .gyp \
 g++~=12.2 \
 make~=4.3 \
 python3~=3.10

USER node
WORKDIR /home/node

COPY --chown=node dev.sh .
COPY --chown=node shellutil ./shellutil
RUN ./dev.sh install-globals \
 && ./dev.sh install-dev-globals \
 && rm -rf shellutil \
 && rm dev.sh

USER root
RUN apk del .gyp

USER node

HEALTHCHECK CMD node --version || exit 1
CMD [ "sh" ]
