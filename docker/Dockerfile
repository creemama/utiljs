# This is a development container. To use this container, run:
# ../scripts/docker.sh

FROM creemama/run-non-root:1.5.1-node-10.15.3

# When upgrading versions for Alpine, run:
# docker run -it --rm node:version-alpine sh
# apk update
# apk search package | sort
# I found package versions at:
# https://pkgs.alpinelinux.org/packages .

ADD install-globals.sh .
ADD install-dev-globals.sh .

RUN apk --no-cache --update add \
      git=2.20.1-r0 \
      openssh=7.9_p1-r4 \
 && ./install-globals.sh \
 && ./install-dev-globals.sh \
 && rm install-globals.sh install-dev-globals.sh \
 && run-non-root -- true

USER node
