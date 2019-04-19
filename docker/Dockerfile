# This is a development container. To use this container, run:
# ../scripts/docker.sh

FROM creemama/node-no-yarn:10.15.3-alpine

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# I got /dev/console from https://hub.docker.com/r/vladgh/gpg/ .
ENV GPG_TTY=/dev/console

# When upgrading versions for Alpine, run:
# docker run -it --rm -u root creemama/node-no-yarn:version-alpine sh
# apk update
# apk search package | sort
# I found package versions at:
# https://pkgs.alpinelinux.org/packages .

RUN apk --no-cache --update add \
      git=2.20.1-r0 \
      gnupg=2.2.12-r0 \
      openssh=7.9_p1-r4

USER node
WORKDIR /home/node

COPY install-globals.sh .
COPY install-dev-globals.sh .

RUN ./install-globals.sh \
 && ./install-dev-globals.sh \
 && rm install-globals.sh install-dev-globals.sh

HEALTHCHECK CMD node --version || exit 1
CMD [ "sh" ]
