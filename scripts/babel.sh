#!/bin/sh

babel () {
  cd ..

  local packages=arrays
  packages=`printf "%s\t%s" "${packages}" errors`
  packages=`printf "%s\t%s" "${packages}" emails`
  packages=`printf "%s\t%s" "${packages}" jquery`
  packages=`printf "%s\t%s" "${packages}" numbers`
  packages=`printf "%s\t%s" "${packages}" objects`
  packages=`printf "%s\t%s" "${packages}" privates`
  packages=`printf "%s\t%s" "${packages}" promises`
  packages=`printf "%s\t%s" "${packages}" strings`

  for package in ${packages}; do
    printf "\033[1m%s\033[0m ... " "utiljs-${package}"
    npx babel \
      "packages/utiljs-${package}/lib" \
      --out-dir "packages/utiljs-${package}/dist"
  done
}

. "`dirname "${0}"`/main.sh"
main babel "$@"
