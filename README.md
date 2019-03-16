# Util.js

> Reusable JavaScript utilities for Node.js

<p>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
  <a href="https://github.com/prettier/prettier"><img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
</p>

Util.js is a [Lerna](https://lernajs.io/) monorepo with the following packages:

| Package                                                                                      |                                                                        NPM Status                                                                        |
| -------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [@util.js/arrays](https://github.com/creemama/utiljs/tree/master/packages/utiljs-arrays)     |   <a href="https://www.npmjs.com/package/@util.js/arrays"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/arrays.svg?style=flat"></a>   |
| [@util.js/aws](https://github.com/creemama/utiljs/tree/master/packages/utiljs-aws)           |      <a href="https://www.npmjs.com/package/@util.js/aws"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/aws.svg?style=flat"></a>      |
| [@util.js/emails](https://github.com/creemama/utiljs/tree/master/packages/utiljs-emails)     |   <a href="https://www.npmjs.com/package/@util.js/emails"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/emails.svg?style=flat"></a>   |
| [@util.js/errors](https://github.com/creemama/utiljs/tree/master/packages/utiljs-errors)     |   <a href="https://www.npmjs.com/package/@util.js/errors"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/errors.svg?style=flat"></a>   |
| [@util.js/files](https://github.com/creemama/utiljs/tree/master/packages/utiljs-files)       |    <a href="https://www.npmjs.com/package/@util.js/files"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/files.svg?style=flat"></a>    |
| [@util.js/jquery](https://github.com/creemama/utiljs/tree/master/packages/utiljs-jquery)     |   <a href="https://www.npmjs.com/package/@util.js/jquery"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/jquery.svg?style=flat"></a>   |
| [@util.js/lerna](https://github.com/creemama/utiljs/tree/master/packages/utiljs-lerna)       |    <a href="https://www.npmjs.com/package/@util.js/lerna"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/lerna.svg?style=flat"></a>    |
| [@util.js/numbers](https://github.com/creemama/utiljs/tree/master/packages/utiljs-numbers)   |  <a href="https://www.npmjs.com/package/@util.js/numbers"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/numbers.svg?style=flat"></a>  |
| [@util.js/objects](https://github.com/creemama/utiljs/tree/master/packages/utiljs-objects)   |  <a href="https://www.npmjs.com/package/@util.js/objects"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/objects.svg?style=flat"></a>  |
| [@util.js/privates](https://github.com/creemama/utiljs/tree/master/packages/utiljs-privates) | <a href="https://www.npmjs.com/package/@util.js/privates"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/privates.svg?style=flat"></a> |
| [@util.js/promises](https://github.com/creemama/utiljs/tree/master/packages/utiljs-promises) | <a href="https://www.npmjs.com/package/@util.js/promises"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/promises.svg?style=flat"></a> |
| [@util.js/streams](https://github.com/creemama/utiljs/tree/master/packages/utiljs-streams)   |  <a href="https://www.npmjs.com/package/@util.js/streams"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/streams.svg?style=flat"></a>  |
| [@util.js/strings](https://github.com/creemama/utiljs/tree/master/packages/utiljs-strings)   |  <a href="https://www.npmjs.com/package/@util.js/strings"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/strings.svg?style=flat"></a>  |
| [@util.js/timers](https://github.com/creemama/utiljs/tree/master/packages/utiljs-timers)     |   <a href="https://www.npmjs.com/package/@util.js/timers"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/timers.svg?style=flat"></a>   |
| [@util.js/urls](https://github.com/creemama/utiljs/tree/master/packages/utiljs-urls)         |     <a href="https://www.npmjs.com/package/@util.js/urls"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/urls.svg?style=flat"></a>     |

The anatomy for each package is loosely based on ["Directory structure for JavaScript/Node Projects"](https://gist.github.com/tracker1/59f2c13044315f88bee9).

Use [conventional commits](https://github.com/pvdlg/conventional-changelog-metahub) for commit messages.

See scripts/README.md for information on the scripts used to maintain this project.
