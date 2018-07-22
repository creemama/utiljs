"use strict";

module.exports = function Files() {
  this.access = fs().access;

  this.accessSync = fs().accessSync;

  this.appendFile = fs().appendFile;

  this.appendFileSync = fs().appendFileSync;

  this.basename = path().basename;

  this.chmod = fs().chmod;

  this.chmodSync = fs().chmodSync;

  this.chown = fs().chown;

  this.chownSync = fs().chownSync;

  this.close = fs().close;

  this.closeSync = fs().closeSync;

  this.copyFile = fs().copyFile;

  this.copyFileSync = fs().copyFileSync;

  this.cp = cp;
  function cp() {
    return promises().call(fs(), fs().copyFile, arguments);
  }

  this.cpr = cpr;
  function cpr() {
    return promises().call(null, ncp(), arguments);
  }

  this.createReadStream = fs().createReadStream;

  this.createWriteStream = fs().createWriteStream;

  this.diff = diff;
  function diff(pathA, pathB, callback) {
    if (!callback) return promises().call(null, this.diff, arguments);
    if (!objects().isDefined(pathA))
      return callback(new TypeError("We expected pathA to be defined."));
    if (!objects().isDefined(pathB))
      return callback(new TypeError("We expected pathB to be defined."));
    var diff = childProcess().spawn("diff", [pathA, pathB]);
    diff.on("close", code => {
      callback(null, code === 0);
    });
    diff.on("error", err => {
      callback(err);
    });
  }

  this.dirname = path().dirname;

  this.exists = fs().exists;

  this.existsSync = fs().existsSync;

  this.extname = path().extname;

  this.fchmod = fs().fchmod;

  this.fchmodSync = fs().fchmodSync;

  this.fchown = fs().fchown;

  this.fchownSync = fs().fchownSync;

  this.fdatasync = fs().fdatasync;

  this.fdatasyncSync = fs().fdatasyncSync;

  this.filesWithExtension = filesWithExtension;
  function filesWithExtension(params, callback) {
    if (typeof callback === "function")
      return promises().applyPromise(this, this.filesWithExtension, arguments);
    const thiz = this;
    return (async function() {
      if (!objects().isDefined(params))
        throw new TypeError(
          `We expected params to be defined, but it was ${params}.`
        );
      const { dir, ext } = params;

      if (!objects().isDefined(dir))
        throw new TypeError(
          `We expected params.dir to be defined, but it was ${dir}.`
        );
      if (!objects().isDefined(ext))
        throw new TypeError(
          `We expected params.ext to be defined, but it was ${ext}.`
        );

      const files = await thiz.readdir(dir);
      const filesWithExt = [];
      const divider = strings().endsWith(dir, "/") ? "" : "/";
      files.forEach(file => {
        if (strings().endsWith(file.toLowerCase(), "." + ext)) {
          filesWithExt.push(dir + divider + file);
        }
      });
      return filesWithExt;
    })();
  }

  /**
   * Does not recursively search for files.
   * When specifying ext, do not include the period.
   */
  this.filesWithExtensionSync = filesWithExtensionSync;
  function filesWithExtensionSync(params) {
    if (!objects().isDefined(params))
      throw new TypeError(
        `We expected params to be defined, but it was ${params}.`
      );

    const { dir, ext } = params;

    if (!objects().isDefined(dir))
      throw new TypeError(
        `We expected params.dir to be defined, but it was ${dir}.`
      );
    if (!objects().isDefined(ext))
      throw new TypeError(
        `We expected params.ext to be defined, but it was ${ext}.`
      );

    const files = this.readdirSync(dir);
    const filesWithExt = [];
    const divider = strings().endsWith(dir, "/") ? "" : "/";
    files.forEach(file => {
      if (strings().endsWith(file.toLowerCase(), "." + ext)) {
        filesWithExt.push(dir + divider + file);
      }
    });
    return filesWithExt;
  }

  this.format = path().format;

  this.fstat = fs().fstat;

  this.fstatSync = fs().fstatSync;

  this.fsync = fs().fsync;

  this.fsyncSync = fs().fsyncSync;

  this.ftruncate = fs().ftruncate;

  this.ftruncateSync = fs().ftruncateSync;

  this.futimes = fs().futimes;

  this.futimesSync = fs().futimesSync;

  this.isAbsolute = path().isAbsolute;

  this.isDirectory = isDirectory;
  function isDirectory(path, callback) {
    if (typeof callback === "function")
      return promises().applyPromise(this, this.isDirectory, arguments);
    const thiz = this;
    return (async function() {
      const stats = await thiz.lstat(path);
      return stats.isDirectory();
    })();
  }

  this.isDirectorySync = isDirectorySync;
  function isDirectorySync(path) {
    return this.lstatSync(path).isDirectory();
  }

  this.isFile = isFile;
  function isFile(path, callback) {
    if (typeof callback === "function")
      return promises().applyPromise(this, this.isFile, arguments);
    const thiz = this;
    return (async function() {
      const stats = await thiz.lstat(path);
      return stats.isFile();
    })();
  }

  this.isFileSync = isFileSync;
  function isFileSync(path) {
    return this.lstatSync(path).isFile();
  }

  this.join = path().join;

  this.link = fs().link;

  this.linkSync = fs().linkSync;

  this.lstat = lstat;
  function lstat() {
    return promises().applyCallback(fs(), fs().lstat, arguments);
  }

  this.lstatSync = fs().lstatSync;

  this.mkdir = fs().mkdir;

  this.mkdirp = function(path, cb) {
    return promises().call(null, mkdirp(), arguments);
  };

  this.mkdirpSync = function(dir, opts) {
    return mkdirp().sync(dir, opts);
  };

  this.mkdirSync = fs().mkdirSync;

  this.mkdtemp = fs().mkdtemp;

  this.mkdtempSync = fs().mkdtempSync;

  this.normalize = path().normalize;

  this.open = fs().open;

  this.openSync = fs().openSync;

  this.parse = path().parse;

  this.read = fs().read;

  this.readdir = promises().promisify(fs().readdir);

  this.readdirSync = fs().readdirSync;

  this.readFile = readFile;
  function readFile() {
    return promises().call(fs(), fs().readFile, arguments);
  }

  this.readFileSync = fs().readFileSync;

  this.readFiles = readFiles;
  function readFiles(files, options, callback) {
    let localOptions;
    let localCallback;
    if (typeof options === "function") {
      localOptions = {};
      localCallback = options;
    } else {
      localOptions = options;
      localCallback = callback;
    }
    if (typeof localCallback === "function")
      return promises().applyPromise(this, this.readFiles, arguments);
    const thiz = this;
    return (async function() {
      let string = "";
      for (const file of files) {
        string += await thiz.readFile(file, localOptions);
      }
      return string;
    })();
  }

  this.readlink = fs().readlink;

  this.readlinkSync = fs().readlinkSync;

  this.readSync = fs().readSync;

  this.realpath = fs().realpath;
  // this.realpath.native

  this.realpathSync = fs().realpathSync;
  // this.realpathSync.native

  this.relative = path().relative;

  this.rename = fs().rename;

  this.renameSync = fs().renameSync;

  this.resolve = path().resolve;

  this.rmdir = fs().rmdir;

  this.rmdirSync = fs().rmdirSync;

  this.rmrf = rmrf;
  function rmrf() {
    return promises().call(null, rimraf(), arguments);
  }

  this.rmrfSync = function(path, opts) {
    return rimraf().sync(path, opts);
  };

  this.stat = stat;
  function stat() {
    return promises().call(fs(), fs().stat, arguments);
  }

  this.statSync = fs().statSync;

  this.symlink = fs().symlink;

  this.symlinkSync = fs().symlinkSync;

  this.toNamespacedPath = path().toNamespacedPath;

  this.touch = function() {
    return touch().apply(null, arguments);
  };

  this.truncate = fs().truncate;

  this.truncateSync = fs().truncateSync;

  this.unlink = fs().unlink;

  this.unlinkSync = fs().unlinkSync;

  this.unwatchFile = fs().unwatchFile;

  this.utimes = fs().utimes;

  this.utimesSync = fs().utimesSync;

  this.watch = fs().watch;

  this.watchFile = fs().watchFile;

  this.write = fs().write;

  this.writeFile = writeFile;
  function writeFile() {
    return promises().call(fs(), fs().writeFile, arguments);
  }

  this.writeFileSync = fs().writeFileSync;

  this.writeSync = fs().writeSync;

  this.FileReadStream = fs().FileReadStream;

  this.FileWriteStream = fs().FileWriteStream;

  this.ReadStream = fs().ReadStream;

  this.Stats = fs().Stats;

  this.WriteStream = fs().WriteStream;

  this.constants = fs().constants;

  this.delimiter = path().delimiter;

  this.posix = path().posix;

  this.sep = path().sep;

  this.win32 = path().win32;
};

const dependencies = {};
function get(dependency) {
  return (
    dependencies[dependency] || (dependencies[dependency] = require(dependency))
  );
}

function asyncwaterfall() {
  return get("async-waterfall");
}
function childProcess() {
  return get("child_process");
}
function fs() {
  return get("fs");
}
function mkdirp() {
  return get("mkdirp");
}
function ncp() {
  return get("ncp");
}
function objects() {
  return get("utiljs-objects");
}
function path() {
  return get("path");
}
function promises() {
  return get("utiljs-promises");
}
function rimraf() {
  return get("rimraf");
}
function strings() {
  return get("utiljs-strings");
}
function touch() {
  return get("touch");
}
