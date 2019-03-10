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
    process: () => process
  };
}

class LernaUtils {
  constructor() {
    privates.lazyLoad(this, resources());
  }

  audit() {
    const packagesDir = _process(this).cwd() + "/packages";
    internalAudit(this, packagesDir).catch(error => {
      _console(this).error(error);
      _process(this).exit(1);
    });
  }
}

async function internalAudit(thiz, packagesDir) {
  _console(thiz).log(`Visiting ${packagesDir}.. ...`);

  const { stdout, stderr } = await promises(thiz).promisify(execute)(
    thiz,
    "npm audit",
    { cwd: `${packagesDir}/..` }
  );
  _console(thiz).log(stdout);
  if (stderr) _console(thiz).error(stdout);
  _console(thiz).log();

  let errorCode = 0;

  let packageDescriptors = (await files(thiz).readdir(packagesDir, {
    withFileTypes: true
  }))
    .filter(pkg => pkg.isDirectory())
    .map(pkg => `${packagesDir}/${pkg.name}`)
    .map(
      async packageDir =>
        await describePackage(thiz, packageDir).catch(error => {
          _console(thiz).log(`Skipping ${packageDir} ...`);
          errorCode = handleError(thiz, error, packageDir);
          return null;
        })
    );

  packageDescriptors = (await promises(thiz).all(packageDescriptors)).filter(
    packageDesc => packageDesc != null
  );

  const packages = packageDescriptors.map(
    packageDescriptor => packageDescriptor.packageObj.name
  );

  for (let i = 0; i < packageDescriptors.length; i++) {
    await processPackage(thiz, packageDescriptors[i], packages).catch(
      error =>
        (errorCode = handleError(thiz, error, packageDescriptors[i].packageDir))
    );
  }

  if (errorCode) _process(thiz).exit(errorCode);
}

async function describePackage(thiz, packageDir) {
  const packageJson = await files(thiz).readFile(
    `${packageDir}/package.json`,
    "utf8"
  );
  const packageLockJson = await files(thiz).readFile(
    `${packageDir}/package-lock.json`,
    "utf8"
  );
  const packageObj = json(thiz).parse(packageJson);
  const packageLockObj = json(thiz).parse(packageLockJson);
  return {
    packageDir,
    packageJson,
    packageLockJson,
    packageLockObj,
    packageObj
  };
}

function handleError(thiz, error, packageDir) {
  let errorCode;
  if (numbers(thiz).isInteger(error.code) && error.code != 0) {
    errorCode = error.code;
    if (error.stdout) _console(thiz).log(error.stdout);
    if (error.stderr) _console(thiz).log(error.stderr);
  } else {
    errorCode = 2;
    _console(thiz).log(error);
  }
  _console(thiz).log();
  return errorCode;
}

async function processPackage(thiz, packageDescriptor, packages) {
  const {
    packageDir,
    packageJson,
    packageLockJson,
    packageLockObj,
    packageObj
  } = packageDescriptor;

  const dependencies = objects(thiz).entries(packageObj.dependencies || {});
  const lockDependencies =
    packageLockObj.dependencies || (packageLockObj.dependencies = {});

  let packageFound = false;
  for (let i = 0; i < dependencies.length; i++) {
    if (packages.includes(dependencies[i][0])) {
      lockDependencies[dependencies[i][0]] = { version: dependencies[i][1] };
      packageFound = true;
    }
  }
  try {
    if (packageFound) {
      await files(thiz).copyFile(
        `${packageDir}/package-lock.json`,
        `${packageDir}/package-lock.json.bak`
      );
      await files(thiz).writeFile(
        `${packageDir}/package-lock.json`,
        json(thiz).stringify(packageLockObj, null, "\t"),
        "utf8"
      );
    }

    _console(thiz).log(`Visiting ${packageDir} ...`);

    const { stdout, stderr } = await promises(thiz).promisify(execute)(
      thiz,
      "npm audit",
      { cwd: packageDir }
    );
    _console(thiz).log(stdout);
    if (stderr) _console(thiz).error(stdout);
    _console(thiz).log();
  } finally {
    if (packageFound) {
      await files(thiz).copyFile(
        `${packageDir}/package-lock.json.bak`,
        `${packageDir}/package-lock.json`
      );
      await files(thiz).rmrf(`${packageDir}/package-lock.json.bak`);
    }
  }
}

function execute(thiz, command, options, callback) {
  child_process(thiz).exec(command, options, (error, stdout, stderr) => {
    if (error) {
      error.stdout = stdout;
      error.stderr = stderr;
      callback(error);
    } else callback(null, { stdout, stderr });
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
