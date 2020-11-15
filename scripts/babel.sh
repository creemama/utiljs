#!/bin/sh

exec_babel () {
  cd ..

  if [ -n "${1:-}" ] && [ -d "packages/${1}" ]; then
    printf "\033[1m%s\033[0m ... " "${1}"
    babel \
      "packages/${1}/lib" \
      --out-dir "packages/${1}/dist"
    return $?
  fi

  local packages
  packages=arrays
  packages=$(printf "%s\t%s" "${packages}" emails)
  packages=$(printf "%s\t%s" "${packages}" errors)
  packages=$(printf "%s\t%s" "${packages}" jquery)
  packages=$(printf "%s\t%s" "${packages}" numbers)
  packages=$(printf "%s\t%s" "${packages}" objects)
  packages=$(printf "%s\t%s" "${packages}" privates)
  packages=$(printf "%s\t%s" "${packages}" promises)
  packages=$(printf "%s\t%s" "${packages}" strings)

  for package in ${packages}; do
    printf "\033[1m%s\033[0m ... " "utiljs-${package}"
    babel \
      "packages/utiljs-${package}/lib" \
      --out-dir "packages/utiljs-${package}/dist"
  done
}

# shellcheck source=scripts/main.sh
. "$(dirname "${0}")/main.sh"
main exec_babel "$@"
