The scripts in this directory do the following:

- Run a Docker container for development.

  - `docker.sh`

- Install and update dependencies. Use [fix] as the commit type.

  - `install-globals.sh`
  - `install-dev-globals.sh`
  - `outdated.sh`
  - `install.sh`
  - `npm run package-lock` - BE CAREFUL! This runs `git clean -fdx`; called by publish.sh
  - `npm run audit`

- Format and run a linter.

  - `prettier.sh` (Use [style] as the commit type.)
  - `eslint.sh`
  - `` prettier --write `git ls-files -m` ``

- Update documentation. Use [docs] as the commit type.

  - `jsdoc.sh`
  - `jsdoc2md.sh`
  - `prettier.sh`

- Test and publish.

  - `npm run clean` - called by travis.sh and publish.sh
  - `babel.sh`
  - `npm run build` - cleans and then calls babel; called by travis.sh and publish.sh
  - `mocha.sh`
  - `npm run test`
  - `travis.sh`
  - `publish.sh`
