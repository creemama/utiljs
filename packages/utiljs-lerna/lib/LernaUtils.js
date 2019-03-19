"use strict";

const Privates = require("@util.js/privates");
const privates = new Privates();

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

module.exports = class LernaUtils {
  constructor() {
    privates.lazyLoadProps(this, resources());
  }

  audit() {
    const thiz = privates.getCallProxy(this);
    const packagesDir = thiz.process.cwd() + "/packages";
    internalAudit(thiz, packagesDir).catch(error => {
      thiz.console.error(error);
      thiz.process.exit(1);
    });
  }
};

async function internalAudit(thiz, packagesDir) {
  thiz.console.log(`Visiting ${packagesDir}.. ...`);

  const { stdout, stderr } = await thiz.promises.promisify(execute)(
    thiz,
    "npm audit",
    { cwd: `${packagesDir}/..` }
  );
  thiz.console.log(stdout);
  if (stderr) thiz.console.error(stdout);
  thiz.console.log();

  let errorCode = 0;

  let packageDescriptors = (await thiz.files.readdir(packagesDir, {
    withFileTypes: true
  }))
    .filter(pkg => pkg.isDirectory())
    .map(pkg => `${packagesDir}/${pkg.name}`)
    .map(
      async packageDir =>
        await describePackage(thiz, packageDir).catch(error => {
          thiz.console.log(`Skipping ${packageDir} ...`);
          errorCode = handleError(thiz, error, packageDir);
          return null;
        })
    );

  packageDescriptors = (await thiz.promises.all(packageDescriptors)).filter(
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

  if (errorCode) thiz.process.exit(errorCode);
}

async function describePackage(thiz, packageDir) {
  const packageJson = await thiz.files.readFile(
    `${packageDir}/package.json`,
    "utf8"
  );
  const packageLockJson = await thiz.files.readFile(
    `${packageDir}/package-lock.json`,
    "utf8"
  );
  const packageObj = thiz.json.parse(packageJson);
  const packageLockObj = thiz.json.parse(packageLockJson);
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
  if (thiz.numbers.isInteger(error.code) && error.code != 0) {
    errorCode = error.code;
    if (error.stdout) thiz.console.log(error.stdout);
    if (error.stderr) thiz.console.log(error.stderr);
  } else {
    errorCode = 2;
    thiz.console.log(error);
  }
  thiz.console.log();
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

  const dependencies = thiz.objects.entries(packageObj.dependencies || {});
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
      await thiz.files.copyFile(
        `${packageDir}/package-lock.json`,
        `${packageDir}/package-lock.json.bak`
      );
      await thiz.files.writeFile(
        `${packageDir}/package-lock.json`,
        thiz.json.stringify(packageLockObj, null, "\t"),
        "utf8"
      );
    }

    thiz.console.log(`Visiting ${packageDir} ...`);

    const { stdout, stderr } = await thiz.promises.promisify(execute)(
      thiz,
      "npm audit",
      { cwd: packageDir }
    );
    thiz.console.log(stdout);
    if (stderr) thiz.console.error(stdout);
    thiz.console.log();
  } finally {
    if (packageFound) {
      await thiz.files.copyFile(
        `${packageDir}/package-lock.json.bak`,
        `${packageDir}/package-lock.json`
      );
      await thiz.files.rmrf(`${packageDir}/package-lock.json.bak`);
    }
  }
}

function execute(thiz, command, options, callback) {
  thiz.child_process.exec(command, options, (error, stdout, stderr) => {
    if (error) {
      error.stdout = stdout;
      error.stderr = stderr;
      callback(error);
    } else callback(null, { stdout, stderr });
  });
}
