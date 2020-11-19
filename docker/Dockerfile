# This is a development container. To use this container, run:
# ../scripts/docker.sh

FROM creemama/node-no-yarn:14.15.0-alpine3.11

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# I got /dev/console from https://hub.docker.com/r/vladgh/gpg/ .
ENV GPG_TTY=/dev/console

# When upgrading versions for Alpine, run:
# docker run -it --rm -u root creemama/node-no-yarn:lts-alpine sh
# apk update
# apk search package | sort
# I found package versions at:
# https://pkgs.alpinelinux.org/packages .

RUN printf '%s' '@edgecommunity http://nl.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
 && apk --no-cache --update add \
      git=2.24.3-r0 \
      gnupg=2.2.19-r0 \
      openssh=8.1_p1-r0 \
      shellcheck=0.7.0-r1 \
      shfmt@edgecommunity=3.2.0-r1

USER node
WORKDIR /home/node

COPY dev.sh .

RUN ./dev.sh install-globals \
 && ./dev.sh install-dev-globals \
 && rm dev.sh

HEALTHCHECK CMD node --version || exit 1
CMD [ "sh" ]
