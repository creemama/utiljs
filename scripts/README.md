The scripts in this directory do the following:

- Run a Docker container for development.

  - `docker.sh`

- Install and update dependencies. Use [fix] as the commit type.

  - `outdated.sh`
  - `install.sh`
  - `audit.sh`

- Format and run a linter.

  - `prettier.sh` (Use [style] as the commit type.)
  - `eslint.sh`
  - `` npx prettier --write `git ls-files -m` ``

- Update documentation. Use [docs] as the commit type.

  - `jsdoc.sh`
  - `jsdoc2md.sh`
  - `prettier.sh`

- Test and publish.

  - `babel.sh`
  - `mocha.sh`
  - `travis.sh`
  - `publish.sh`
