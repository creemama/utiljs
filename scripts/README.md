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
  - `mocha.sh`
  - `travis.sh`
  - `publish.sh`

When writing classes, we use

```
/**
 * An example class.
 * @public
 * @class
 */
class Example {
...
}
module.exports = Example;
```

instead of

```
/**
 * An example class.
 * @public
 * @class
 */
module.exports = class Example {
...
}
```

because `jsdoc2md.sh` cannot find the documentation for Example in the first
code snippet.
