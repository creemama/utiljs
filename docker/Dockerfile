# This is a development container. To use this container, run:
# ../scripts/docker.sh

# If you update this base image, update .travis.yml to match the base image's
# npm version.
FROM creemama/run-non-root:1.5.1-node

# When upgrading versions for Alpine, run:
# docker run -it --rm node:version-alpine sh
# apk update
# apk search package | sort
# I found package versions at:
# https://pkgs.alpinelinux.org/packages .

RUN apk --no-cache --update add \
      git=2.18.1-r0 \
      openssh=7.7_p1-r4 \
 && run-non-root -- true

USER node
