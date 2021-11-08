# Util.js

> Reusable JavaScript utilities for Node.js

<p>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
  <a href="https://github.com/prettier/prettier"><img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

Util.js is a [Lerna](https://lerna.js.org/) monorepo with the following packages:

| Package                                                                                              |                                                                            NPM Status                                                                            |
| ---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [@util.js/arrays](https://github.com/creemama/utiljs/tree/master/packages/utiljs-arrays)             |       <a href="https://www.npmjs.com/package/@util.js/arrays"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/arrays.svg?style=flat"></a>       |
| [@util.js/aws](https://github.com/creemama/utiljs/tree/master/packages/utiljs-aws)                   |          <a href="https://www.npmjs.com/package/@util.js/aws"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/aws.svg?style=flat"></a>          |
| [@util.js/emails](https://github.com/creemama/utiljs/tree/master/packages/utiljs-emails)             |       <a href="https://www.npmjs.com/package/@util.js/emails"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/emails.svg?style=flat"></a>       |
| [@util.js/errors](https://github.com/creemama/utiljs/tree/master/packages/utiljs-errors)             |       <a href="https://www.npmjs.com/package/@util.js/errors"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/errors.svg?style=flat"></a>       |
| [@util.js/jquery](https://github.com/creemama/utiljs/tree/master/packages/utiljs-jquery)             |       <a href="https://www.npmjs.com/package/@util.js/jquery"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/jquery.svg?style=flat"></a>       |
| [@util.js/node-files](https://github.com/creemama/utiljs/tree/master/packages/utiljs-node-files)     |   <a href="https://www.npmjs.com/package/@util.js/node-files"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-files.svg?style=flat"></a>   |
| [@util.js/node-http](https://github.com/creemama/utiljs/tree/master/packages/utiljs-node-http)       |    <a href="https://www.npmjs.com/package/@util.js/node-http"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-http.svg?style=flat"></a>    |
| [@util.js/node-lerna](https://github.com/creemama/utiljs/tree/master/packages/utiljs-node-lerna)     |   <a href="https://www.npmjs.com/package/@util.js/node-lerna"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-lerna.svg?style=flat"></a>   |
| [@util.js/node-streams](https://github.com/creemama/utiljs/tree/master/packages/utiljs-node-streams) | <a href="https://www.npmjs.com/package/@util.js/node-streams"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-streams.svg?style=flat"></a> |
| [@util.js/node-timers](https://github.com/creemama/utiljs/tree/master/packages/utiljs-node-timers)   |  <a href="https://www.npmjs.com/package/@util.js/node-timers"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-timers.svg?style=flat"></a>  |
| [@util.js/numbers](https://github.com/creemama/utiljs/tree/master/packages/utiljs-numbers)           |      <a href="https://www.npmjs.com/package/@util.js/numbers"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/numbers.svg?style=flat"></a>      |
| [@util.js/objects](https://github.com/creemama/utiljs/tree/master/packages/utiljs-objects)           |      <a href="https://www.npmjs.com/package/@util.js/objects"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/objects.svg?style=flat"></a>      |
| [@util.js/privates](https://github.com/creemama/utiljs/tree/master/packages/utiljs-privates)         |     <a href="https://www.npmjs.com/package/@util.js/privates"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/privates.svg?style=flat"></a>     |
| [@util.js/promises](https://github.com/creemama/utiljs/tree/master/packages/utiljs-promises)         |     <a href="https://www.npmjs.com/package/@util.js/promises"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/promises.svg?style=flat"></a>     |
| [@util.js/strings](https://github.com/creemama/utiljs/tree/master/packages/utiljs-strings)           |      <a href="https://www.npmjs.com/package/@util.js/strings"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/strings.svg?style=flat"></a>      |

The anatomy for each package is loosely based on ["Directory structure for JavaScript/Node Projects"](https://gist.github.com/tracker1/59f2c13044315f88bee9).

Use [conventional commits](https://github.com/pvdlg/conventional-changelog-metahub) for commit messages.

See scripts/README.md for information on the scripts used to maintain this project.

## Maintenance

The scripts in this directory do the following:

- Run a Docker container for development.

  - `./dev.sh docker`

- Install and update dependencies. Use [fix] as the commit type.

  - `./dev.sh docker-update-dockerfile`
  - `./dev.sh docker-update`
  - `./dev.sh install-globals` - used in docker/Dockerfile
  - `./dev.sh install-dev-globals` - used in docker/Dockerfile
  - `./dev.sh install`
  - `./dev.sh audit`
  - `npm audit fix && ./dev.sh install` - run if an audit finds something

- Format and run a linter.

  - `./dev.sh prettier` (Use [style] as the commit type.)
  - `./dev.sh eslint`
  - `` prettier --write `git ls-files -m` ``
  - `./dev.sh shell-format`

- Update documentation. Use [docs] as the commit type.

  - `./dev.sh jsdoc`
  - `./dev.sh jsdoc2md`
  - `./dev.sh prettier`
  - `git commit -am "style: run prettier"`

- Test and publish.

  - `./dev.sh clean`
  - `./dev.sh babel`
  - `./dev.sh build` - executes clean and babel
  - `./dev.sh mocha`
  - `npm run test` - executes build and mocha
  - `./dev.sh travis`
  - `./dev.sh publish` - bumps up the version number
