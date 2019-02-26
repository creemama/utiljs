# This is a development container. To use this container, run:
# ../scripts/docker.sh

FROM creemama/run-non-root:1.4.0-node-10.15.1-1

# When upgrading versions for Alpine, run:
# docker run -it --rm node:version-alpine sh
# apk update
# apk search package | sort
# I found package versions at:
# https://pkgs.alpinelinux.org/packages .

# If you update the version of npm, update .travis.yml too:
# https://www.npmjs.com/package/npm

RUN apk --no-cache --update add \
      git=2.18.1-r0 \
      openssh=7.7_p1-r3 \
 && npm install -g npm@6.8.0 \
 && run-non-root -- true

USER node
