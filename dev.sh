#!/bin/sh

script_dir="$(
	cd "$(dirname "${0}")"
	pwd -P
)"
cd "${script_dir}"
if [ ! -f shellutil/shellutil.sh ]; then
	git submodule update --init
fi
# shellcheck source=shellutil/mainutil.sh
. shellutil/mainutil.sh
# shellcheck source=shellutil/shellutil.sh
. shellutil/shellutil.sh
# shellcheck source=shellutil/updateutil.sh
. shellutil/updateutil.sh
# set -o xtrace

# gnupg, openssh, and terminus-font are for git and gitk.
# ncurses is for tput.
apk_packages='git~=2.24
git-gitk~=2.24
gnupg~=2.2
ncurses~=6.1
openssh~=8.1
shellcheck~=0.7
shfmt@edgecommunity~=3.2
terminus-font~=4.48
'
docker_image=utiljs-dev:0.40.1
npm_dev_globals='eslint@7.14.0
jsdoc@3.6.6
jsdoc-to-markdown@6.0.1
npm-check-updates@10.2.2
prettier@2.2.1
'
npm_global=npm@6.14.9
npm_globals='@babel/cli@7.12.8
@babel/core@7.12.9
lerna@3.22.1
mocha@8.2.1
nyc@15.1.0
'

apk_add() {
	apk_guarantee_edgecommunity
	# shellcheck disable=SC2086
	apk --no-cache --update add ${apk_packages}
}

audit() {
	npx @util.js/node-lerna
}

build() {
	clean
	execute_babel
}

clean() {
	git clean -fdx --exclude "node_modules"
}

execute_babel() {
	if [ -n "${2:-}" ] && [ -d "packages/${2}" ]; then
		printf "\033[1m%s\033[0m ... " "${2}"
		babel \
			"packages/${2}/lib" \
			--out-dir "packages/${2}/dist"
		return $?
	fi

	# shellcheck disable=SC2039
	local packages
	packages='arrays
emails
errors
jquery
numbers
objects
privates
promises
strings
'

	for package in ${packages}; do
		printf "\033[1m%s\033[0m ... " "utiljs-${package}"
		babel \
			"packages/utiljs-${package}/lib" \
			--out-dir "packages/utiljs-${package}/dist"
	done
}

execute_docker() {
	# https://stackoverflow.com/a/30543453
	if [ "$(docker images -q ${docker_image} 2>/dev/null)" = "" ]; then
		cp dev.sh docker
		cp -r shellutil docker/shellutil
		cd docker
		if ! docker build --tag ${docker_image} .; then
			exit "${?}"
		fi
		rm -rf shellutil
		rm -rf dev.sh
	fi

	# We mount /tmp because of the following error:
	# ~/utiljs $ ./scripts/jsdoc2md.sh
	# /home/node/utiljs/node_modules/mkdirp2/index.js:87
	#           throw err0
	#           ^
	#
	# Error: EROFS: read-only file system, mkdir '/tmp/jsdoc-api'
	#     at Object.mkdirSync (fs.js:753:3)
	# ...

	# /home/node/.gnupg cannot be read-only because of the following error:
	# ~/utiljs $ git commit
	# error: gpg failed to sign the data
	# fatal: failed to write commit object

	# IP, DISPLAY, and /tmp/.X11-unix are for gitk. See shellutil/git.sh.
	export IP
	IP="$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')"
	xhost + "$IP"

	# shellcheck disable=SC2068
	docker run \
		--cap-drop=ALL \
		--cpu-shares=1024 \
		--env DISPLAY="$IP":0 \
		--interactive \
		--memory 1.5G \
		--name utiljs-dev \
		--pids-limit 100 \
		--read-only \
		--restart=no \
		--rm \
		--security-opt=no-new-privileges:true \
		--tty \
		--volume /home/node \
		--volume /tmp/.X11-unix:/tmp/.X11-unix \
		--volume ~/.gnupg:/home/node/.gnupg \
		--volume ~/.ssh:/home/node/.ssh:ro \
		--volume "${script_dir}:/home/node/utiljs" \
		--volume /tmp \
		--workdir /home/node/utiljs \
		"${docker_image}" ${@}
}

execute_eslint() {
	# shellcheck disable=SC2039
	local path
	path="."
	# shellcheck disable=SC2039
	local prefix
	prefix=""
	if [ -n "${2:-}" ] && [ -d "packages/${2}" ]; then
		path="./packages/${2}"
		prefix="\./packages/${2}/"
	fi

	mkdir -p target

	find "${path}" -type f |
		grep -E "^${prefix}.*\.js$" |
		grep -E -v "^.*/(dist|node_modules|target)/.*$" \
			>target/eslint.txt

	sort target/eslint.txt -o target/eslint.txt

	while read -r in; do
		echo "${in}"
		eslint "${in}"
	done <target/eslint.txt

	rm -rf target/eslint.txt
}

execute_jsdoc() {
	if [ -d "target/jsdoc" ]; then
		rm -rf target/jsdoc
	fi

	# shellcheck disable=SC2039
	local path
	path="."
	# shellcheck disable=SC2039
	local prefix
	prefix=""
	if [ -n "${2:-}" ] && [ -d "packages/${2}" ]; then
		path="./packages/${2}"
		prefix="\./packages/${2}/"
	fi

	# shellcheck disable=SC2046
	jsdoc \
		--destination target/jsdoc \
		$(find "${path}" -type f |
			grep -E "^${prefix}.*\.js$" |
			grep -E -v "^.*/(dist|node_modules|target)/.*$")
}

execute_jsdoc2md() {
	if [ -d "target/jsdoc2md" ]; then
		rm -rf target/jsdoc2md
	fi

	mkdir -p target/jsdoc2md

	# shellcheck disable=SC2039
	local path
	path="."
	# shellcheck disable=SC2039
	local prefix
	prefix=""
	# shellcheck disable=SC2039
	local filename
	filename="jsdoc2md.md"
	if [ -n "${2:-}" ] && [ -d "packages/${2}" ]; then
		path="./packages/${2}"
		prefix="\./packages/${2}/"
		filename="${2}.md"
	fi

	# shellcheck disable=SC2046
	jsdoc2md \
		$(find "${path}" -type f |
			grep -E "^${prefix}.*\.js$" |
			grep -E -v "^.*/(dist|node_modules|target)/.*$") \
		>"target/jsdoc2md/${filename}"
}

execute_mocha() {
	if [ -n "${2:-}" ] && [ -d "packages/${2}" ]; then
		cd "packages/${2}"
		nyc \
			--reporter html \
			--reporter text \
			--report-dir target/coverage \
			mocha
	else
		if [ -n "${1:-}" ]; then
			shift
		fi
		cd packages
		for package in */; do
			cd "${package}"
			if [ -d "test" ]; then
				echo "Visting ${package}"
				nyc \
					--reporter html \
					--reporter text \
					--report-dir target/coverage \
					mocha "${@}"
			else
				echo "Skipping ${package}"
				echo
			fi
			cd ..
		done
	fi
}

execute_outdated() {
	set +o errexit
	# shellcheck disable=SC2039
	local exit_code
	exit_code=0
	npm outdated -g
	npm outdated
	cd packages || exit
	for package in */; do
		(
			cd "${package}" || exit
			echo "Visting ${package}"
			npm outdated
		)
		latest_exit_code=${?}
		if [ ${latest_exit_code} -ne 0 ]; then
			exit_code=${latest_exit_code}
		fi
	done
	return ${exit_code}
}

execute_prettier() {
	# shellcheck disable=SC2039
	local path
	path="."
	# shellcheck disable=SC2039
	local prefix
	prefix=""
	if [ -n "${2:-}" ] && [ -d "packages/${2}" ]; then
		path="./packages/${2}"
		prefix="\./packages/${2}/"
	fi

	mkdir -p target

	find "${path}" -type f |
		grep -E "^(\./\.babelrc|${prefix}.*\.(css|js|json|jsx|md|scss))$" |
		grep -E -v "^.*/(.nyc_output|dist|node_modules|target)/.*$" |
		grep -E -v "^.*/package-lock\.json$" |
		grep -E -v "^\./lerna\.json$" \
			>target/prettier.txt

	sort target/prettier.txt -o target/prettier.txt

	while read -r in; do prettier --write "$in"; done <target/prettier.txt

	rm -rf target/prettier.txt
}

execute_travis() {
	clean
	install
	git status
	run_test
	git push origin master:update --force
}

install() {
	npm install --save-exact
	lerna bootstrap -- --save-exact
	printf "\n\033[1m%s\033[0m\n\n" "** Consider running \"./dev.sh package-lock\" as well. **"
}

install_dev_globals() {
	# We do not need these global packages to run in Travis CI.
	# shellcheck disable=SC2086
	npm install --global ${npm_dev_globals}
}

install_globals() {
	# We use these global packages to run in Travis CI.

	# Including @babel/core prevents the following warning:
	# npm WARN @babel/cli@ 7.2.3 requires a peer of @babel/core@^7.0.0-0 but
	# none is installed. You must install peer dependencies yourself.

	# shellcheck disable=SC2086
	npm install --global ${npm_global}
	# shellcheck disable=SC2086
	npm install --global ${npm_globals}
}

main() {
	# shellcheck disable=SC2039
	local command_help
	command_help='apk-add - Add Alpine packages needed by docker/Dockerfile.
audit - Run audit in all packages.
babel - Run babel on certain (mostly non-node) packages.
build - Run clean and babel.
clean - git clean -fdx --exclude "node_modules"
docker - Develop inside a Docker container.
docker-update - Run update using the latest creemama/node-no-yarn:lts-alpine Docker image.
eslint - Run eslint in all packages.
git - Run git setting GPG_TTY if not already set for signing commits.
gitk - Run gitk.
install - Run install in all packages.
install-dev-globals - Install Node.js globals not needed by Travis CI.
install-globals - Install Node.js globals needed by Travis CI.
jsdoc - Run jsdoc in all packages.
jsdoc2md - Run jsdoc2md in all packages.
mocha - Run mocha/nyc in all packages.
outdated - Run npm outdated in all packages.
package-lock - Update package-lock.json files in all packages.
prettier - Run prettier in all packages.
publish - Bump the version number and publish all packages to npm.
shell-format - Format shell scripts and run shellcheck.
test - Run build and mocha for Travis CI.
travis - Prepare the workspace before pushing an update branch for Travis CI to run.
update - Check and update project dependencies.'
	# shellcheck disable=SC2039
	local commands
	commands="$(main_extract_commands "$command_help")"
	# shellcheck disable=SC2086
	if [ -z "${1:-}" ]; then
		main_exit_with_no_command_error "$command_help"
	elif [ "$1" = "$(arg 0 $commands)" ]; then
		apk_add
	elif [ "$1" = "$(arg 1 $commands)" ]; then
		audit
	elif [ "$1" = "$(arg 2 $commands)" ]; then
		execute_babel "${@}"
	elif [ "$1" = "$(arg 3 $commands)" ]; then
		build
	elif [ "$1" = "$(arg 4 $commands)" ]; then
		clean
	elif [ "$1" = "$(arg 5 $commands)" ]; then
		shift
		execute_docker "${@:-}"
	elif [ "$1" = "$(arg 6 $commands)" ]; then
		run_docker_update
	elif [ "$1" = "$(arg 7 $commands)" ]; then
		execute_eslint "${@}"
	elif [ "$1" = "$(arg 8 $commands)" ]; then
		shift
		./shellutil/git.sh git "$@"
	elif [ "$1" = "$(arg 9 $commands)" ]; then
		shift
		./shellutil/git.sh gitk "$@"
	elif [ "$1" = "$(arg 10 $commands)" ]; then
		install
	elif [ "$1" = "$(arg 11 $commands)" ]; then
		install_dev_globals
	elif [ "$1" = "$(arg 12 $commands)" ]; then
		install_globals
	elif [ "$1" = "$(arg 13 $commands)" ]; then
		execute_jsdoc "${@}"
	elif [ "$1" = "$(arg 14 $commands)" ]; then
		execute_jsdoc2md "${@}"
	elif [ "$1" = "$(arg 15 $commands)" ]; then
		execute_mocha "${@}"
	elif [ "$1" = "$(arg 16 $commands)" ]; then
		execute_outdated
	elif [ "$1" = "$(arg 17 $commands)" ]; then
		package_lock
	elif [ "$1" = "$(arg 18 $commands)" ]; then
		execute_prettier "${@}"
	elif [ "$1" = "$(arg 19 $commands)" ]; then
		publish
	elif [ "$1" = "$(arg 20 $commands)" ]; then
		./shellutil/format.sh shell-format
	elif [ "$1" = "$(arg 21 $commands)" ]; then
		run_test
	elif [ "$1" = "$(arg 22 $commands)" ]; then
		execute_travis
	elif [ "$1" = "$(arg 23 $commands)" ]; then
		update
	else
		main_exit_with_invalid_command_error "$1" "$command_help"
	fi
}

package_lock() {
	git clean -fdx
	npm install --save-exact
	lerna exec "npm install --package-lock-only --save-exact"
	install
}

publish() {
	# Log into https://www.npmjs.com .

	# To create scoped packages, create an organization at https://www.npmjs.com.

	git clean -f
	clean
	build
	npm login --scope=@util.js
	lerna publish --exact # This command bumps the version number.

	# You may need to use --force-publish, an intentionally undocumented option.
	# lerna publish --exact --force-publish=utiljs-objects,utiljs-strings
	package_lock
	git commit -am "fix: execute \"./dev.sh package-lock\""
}

run_docker_update() {
	docker pull creemama/node-no-yarn:lts-alpine
	execute_docker sh -c './dev.sh update'
}

run_test() {
	build
	execute_mocha
}

update() {
	apk_update_node_image_version docker/Dockerfile 's#(FROM creemama/node-no-yarn:).*#\\1%s-alpine%s#'
	for package in ${apk_packages}; do
		apk_update_package_version "$(printf %s "${package}" | sed -E 's/([^@]+)(@edgecommunity)?~=.*/\1/')"
	done
	for package in ${npm_dev_globals} ${npm_global} ${npm_globals}; do
		npm_update_package_version "$(printf %s "${package}" | sed -E 's/(.+)@.*/\1/')"
	done
	update_npm_deps
	printf '\n%sUpdate docker_image= if dev.sh dependencies change.\n\n%s' "$(tbold)" "$(treset)"
}

update_npm_deps() {
	npx ncu -u
	cd packages
	for package in */; do
		(
			cd "${package}"
			echo "Visting ${package}"
			npx ncu -u
		)
	done
}

main "${@:-}"
