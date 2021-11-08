# This is a development container. To use this container, run:
# ../scripts/docker.sh

FROM creemama/node-no-yarn:16.13.0-alpine3.14

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# I got /dev/console from https://hub.docker.com/r/vladgh/gpg/ .
ENV GPG_TTY=/dev/console

COPY dev.sh .
COPY shellutil ./shellutil
RUN ./dev.sh apk-add \
 && rm -rf shellutil \
 && rm dev.sh

USER node
WORKDIR /home/node

COPY --chown=node dev.sh .
COPY --chown=node shellutil ./shellutil
RUN ./dev.sh install-globals \
 && ./dev.sh install-dev-globals \
 && rm -rf shellutil \
 && rm dev.sh

HEALTHCHECK CMD node --version || exit 1
CMD [ "sh" ]
