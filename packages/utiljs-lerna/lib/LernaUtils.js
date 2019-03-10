"use strict";

const Privates = require("@util.js/privates");

function resources() {
  return {
    child_process: () => require("child_process"),
    console: () => console,
    files: () => require("@util.js/files"),
    json: () => JSON,
    numbers: () => require("@util.js/numbers"),
    objects: () => require("@util.js/objects"),
    promises: () => require("@util.js/promises"),
    process: () => process,
    strings: () => require("@util.js/strings")
  };
}

class LernaUtils {
  constructor() {
    privates.lazyLoad(this, resources());
  }

  audit() {
    if (_process(this).argv.length <= 3) {
      _console(this).error(
        "Usage: npx utiljs-lerna-audit packages-dir package-prefix"
      );
      _process(this).exit(1);
    }

    let packagesDir = _process(this).argv[2];
    if (strings(this).endsWith(packagesDir, "/"))
      packagesDir = packagesDir.substring(0, packagesDir.length - 1);

    let packagePrefix = _process(this).argv[3];

    internalAudit(this, packagesDir, packagePrefix).catch(error => {
      _console(this).error(error);
      _process(this).exit(2);
    });
  }
}

async function internalAudit(thiz, packagesDir, packagePrefix) {
  _console(thiz).log(`Visiting ${packagesDir}/.. ...`);

  const { stdout, stderr } = await promises(thiz).promisify(execute)(
    thiz,
    "npm audit",
    { cwd: `${packagesDir}/..` }
  );
  _console(thiz).log(stdout);
  if (stderr) _console(thiz).error(stdout);
  _console(thiz).log();

  const packages = (await files(thiz).readdir(packagesDir, {
    withFileTypes: true
  }))
    .filter(pkg => pkg.isDirectory())
    .map(pkg => `${packagesDir}/${pkg.name}`);

  let errorCode = 0;
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    await processPackage(thiz, packages[i], packagePrefix).catch(error => {
      _console(thiz).log(`Skipping ${pkg} ...`);
      if (numbers(thiz).isInteger(error.code) && error.code != 0)
        errorCode = error.code;
      else errorCode = 2;
      _console(thiz).log(error);
      _console(thiz).log();
    });
  }

  if (errorCode) _process(thiz).exit(errorCode);
}

async function processPackage(thiz, pkg, packagePrefix) {
  const packageJson = await files(thiz).readFile(`${pkg}/package.json`, "utf8");
  const packageLockJson = await files(thiz).readFile(
    `${pkg}/package-lock.json`,
    "utf8"
  );
  const packageObj = json(thiz).parse(packageJson);
  const packageLockObj = json(thiz).parse(packageLockJson);

  const dependencies = objects(thiz).entries(packageObj.dependencies || {});
  const lockDependencies =
    packageLockObj.dependencies || (packageLockObj.dependencies = {});

  let packageMissingFromLockFile = false;
  for (let i = 0; i < dependencies.length; i++) {
    if (dependencies[i][0].startsWith(packagePrefix)) {
      if (!lockDependencies[dependencies[i][0]]) {
        lockDependencies[dependencies[i][0]] = { version: dependencies[i][1] };
        packageMissingFromLockFile = true;
      }
    }
  }
  try {
    if (packageMissingFromLockFile) {
      await files(thiz).copyFile(
        `${pkg}/package-lock.json`,
        `${pkg}/package-lock.json.bak`
      );
      await files(thiz).writeFile(
        `${pkg}/package-lock.json`,
        json(thiz).stringify(packageLockObj, null, "\t"),
        "utf8"
      );
    }

    _console(thiz).log(`Visiting ${pkg} ...`);

    const { stdout, stderr } = await promises(thiz).promisify(execute)(
      thiz,
      "npm audit",
      { cwd: pkg }
    );
    _console(thiz).log(stdout);
    if (stderr) _console(thiz).error(stdout);
    _console(thiz).log();
  } finally {
    if (packageMissingFromLockFile) {
      await files(thiz).copyFile(
        `${pkg}/package-lock.json.bak`,
        `${pkg}/package-lock.json`
      );
      await files(thiz).rmrf(`${pkg}/package-lock.json.bak`);
    }
  }
}

function execute(thiz, command, options, callback) {
  child_process(thiz).exec(command, options, (error, stdout, stderr) => {
    if (error) callback(error);
    else callback(null, { stdout, stderr });
  });
}

module.exports = LernaUtils;

const privates = new Privates();
function get(thiz, privatePart) {
  return privates.call(thiz, privatePart);
}

function child_process(thiz) {
  return get(thiz, "child_process");
}
// We start this function name with an underscore (_) to not conflict with the
// global console object.
function _console(thiz) {
  return get(thiz, "console");
}
function files(thiz) {
  return get(thiz, "files");
}
function json(thiz) {
  return get(thiz, "json");
}
function numbers(thiz) {
  return get(thiz, "numbers");
}
function objects(thiz) {
  return get(thiz, "objects");
}
// We start this function name with an underscore (_) to not conflict with the
// global process object.
function _process(thiz) {
  return get(thiz, "process");
}
function promises(thiz) {
  return get(thiz, "promises");
}
function strings(thiz) {
  return get(thiz, "strings");
}
