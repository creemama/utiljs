"use strict";

/**
 * JavaScript Node.js utility methods for files
 * @exports Files
 */
module.exports = class Files {
  access() {
    return promises().applyCallback(fs(), fs().access, arguments);
  }

  accessSync() {
    return fs().accessSync(...arguments);
  }

  appendFile() {
    return promises().applyCallback(fs(), fs().appendFile, arguments);
  }

  appendFileSync() {
    return fs().appendFileSync(...arguments);
  }

  basename() {
    return path().basename(...arguments);
  }

  chmod() {
    return promises().applyCallback(fs(), fs().chmod, arguments);
  }

  chmodSync() {
    return fs().chmodSync(...arguments);
  }

  chown() {
    return promises().applyCallback(fs(), fs().chown, arguments);
  }

  chownSync() {
    return fs().chownSync(...arguments);
  }

  close() {
    return promises().applyCallback(fs(), fs().close, arguments);
  }

  closeSync() {
    return fs().closeSync(...arguments);
  }

  copyFile() {
    return promises().applyCallback(fs(), fs().copyFile, arguments);
  }

  copyFileSync() {
    return fs().copyFileSync(...arguments);
  }

  cp() {
    return promises().applyCallback(fs(), fs().copyFile, arguments);
  }

  cpr() {
    return promises().applyCallback(null, ncp(), arguments);
  }

  createReadStream() {
    return fs().createReadStream(...arguments);
  }

  createWriteStream() {
    return fs().createWriteStream(...arguments);
  }

  diff(pathA, pathB, callback) {
    if (!callback) return promises().applyCallback(null, this.diff, arguments);
    if (!objects().isDefined(pathA))
      return callback(new TypeError("We expected pathA to be defined."));
    if (!objects().isDefined(pathB))
      return callback(new TypeError("We expected pathB to be defined."));
    const diff = childProcess().spawn("diff", [pathA, pathB]);
    diff.on("close", (code) => {
      callback(null, code === 0);
    });
    diff.on("error", (err) => {
      callback(err);
    });
  }

  dirname() {
    return path().dirname(...arguments);
  }

  exists() {
    return promises().applyCallback(fs(), fs().exists, arguments);
  }

  existsSync() {
    return fs().existsSync(...arguments);
  }

  extname() {
    return path().extname(...arguments);
  }

  fchmod() {
    return promises().applyCallback(fs(), fs().fchmod, arguments);
  }

  fchmodSync() {
    return fs().fchmodSync(...arguments);
  }

  fchown() {
    return promises().applyCallback(fs(), fs().fchown, arguments);
  }

  fchownSync() {
    return fs().fchownSync(...arguments);
  }

  fdatasync() {
    return promises().applyCallback(fs(), fs().fdatasync, arguments);
  }

  fdatasyncSync() {
    return fs().fdatasyncSync(...arguments);
  }

  filesWithExtension(params, callback) {
    if (typeof callback === "function")
      return promises().applyPromise(this, this.filesWithExtension, arguments);
    const thiz = this;
    return (async function () {
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
      files.forEach((file) => {
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
  filesWithExtensionSync(params) {
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
    files.forEach((file) => {
      if (strings().endsWith(file.toLowerCase(), "." + ext)) {
        filesWithExt.push(dir + divider + file);
      }
    });
    return filesWithExt;
  }

  format() {
    return path().format(...arguments);
  }

  fstat() {
    return promises().applyCallback(fs(), fs().fstat, arguments);
  }

  fstatSync() {
    return fs().fstatSync(...arguments);
  }

  fsync() {
    return promises().applyCallback(fs(), fs().fsync, arguments);
  }

  fsyncSync() {
    return fs().fsyncSync(...arguments);
  }

  ftruncate() {
    return promises().applyCallback(fs(), fs().ftruncate, arguments);
  }

  ftruncateSync() {
    return fs().ftruncateSync(...arguments);
  }

  futimes() {
    return promises().applyCallback(fs(), fs().futimes, arguments);
  }

  futimesSync() {
    return fs().futimesSync(...arguments);
  }

  isAbsolute() {
    return path().isAbsolute(...arguments);
  }

  isDirectory(path, callback) {
    if (typeof callback === "function")
      return promises().applyPromise(this, this.isDirectory, arguments);
    const thiz = this;
    return (async function () {
      const stats = await thiz.lstat(path);
      return stats.isDirectory();
    })();
  }

  isDirectorySync(path) {
    return this.lstatSync(path).isDirectory();
  }

  isFile(path, callback) {
    if (typeof callback === "function")
      return promises().applyPromise(this, this.isFile, arguments);
    const thiz = this;
    return (async function () {
      const stats = await thiz.lstat(path);
      return stats.isFile();
    })();
  }

  isFileSync(path) {
    return this.lstatSync(path).isFile();
  }

  join() {
    return path().join(...arguments);
  }

  link() {
    return promises().applyCallback(fs(), fs().link, arguments);
  }

  linkSync() {
    return fs().linkSync(...arguments);
  }

  lstat() {
    return promises().applyCallback(fs(), fs().lstat, arguments);
  }

  lstatSync() {
    return fs().lstatSync(...arguments);
  }

  mkdir() {
    return promises().applyCallback(fs(), fs().mkdir, arguments);
  }

  mkdirp() {
    return promises().applyPromise(null, mkdirp(), arguments);
  }

  mkdirpSync() {
    return mkdirp().sync(...arguments);
  }

  mkdirSync() {
    return fs().mkdirSync(...arguments);
  }

  mkdtemp() {
    return promises().applyCallback(fs(), fs().mkdtemp, arguments);
  }

  mkdtempSync() {
    return fs().mkdtempSync(...arguments);
  }

  normalize() {
    return path().normalize(...arguments);
  }

  open() {
    return promises().applyCallback(fs(), fs().open, arguments);
  }

  openSync() {
    return fs().openSync(...arguments);
  }

  parse() {
    return path().parse(...arguments);
  }

  read() {
    return promises().applyCallback(fs(), fs().read, arguments);
  }

  readdir() {
    return promises().applyCallback(fs(), fs().readdir, arguments);
  }

  readdirSync() {
    return fs().readdirSync(...arguments);
  }

  readFile() {
    return promises().applyCallback(fs(), fs().readFile, arguments);
  }

  readFileSync() {
    return fs().readFileSync(...arguments);
  }

  readFiles(files, options, callback) {
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
    return (async function () {
      let string = "";
      for (const file of files) {
        string += await thiz.readFile(file, localOptions);
      }
      return string;
    })();
  }

  /**
   * Reads in the last `n` lines of a file.
   *
   * This function just delegates to https://github.com/alexbbt/read-last-lines .
   *
   * @param {Buffer|String|URL} path absolute or relative path to a file;
   * `URL`s must use the file:// scheme
   * @param {Number} maxLineCount max number of lines to read
   * @param {String} [encoding="utf8"] specifies the character encoding to use
   * or `"buffer"`
   * @param {Function} [callback] an optional callback
   * @return {Promise|undefined} a `Promise` that resolves with the lines (as a
   * `String` or a `Buffer`) or rejects with an error or `undefined` if a
   * `callback` is specified
   *
   * @alias module:Files#readLastLines
   */
  readLastLines() {
    return promises().applyPromise(this, readLastLines().read, arguments);
  }

  readlink() {
    return promises().applyCallback(fs(), fs().readlink, arguments);
  }

  readlinkSync() {
    return fs().readlinkSync(...arguments);
  }

  readSync() {
    return fs().readSync(...arguments);
  }

  get realpath() {
    const returnValue = promises().promisify(fs().realpath).bind(fs());
    returnValue.native = promises().promisify(fs().realpath.native).bind(fs());
    return returnValue;
  }

  get realpathSync() {
    const returnValue = fs().realpathSync.bind(fs());
    returnValue.native = fs().realpathSync.native.bind(fs());
    return returnValue;
  }

  relative() {
    return path().relative(...arguments);
  }

  rename() {
    return promises().applyCallback(fs(), fs().rename, arguments);
  }

  renameSync() {
    return fs().renameSync(...arguments);
  }

  resolve() {
    return path().resolve(...arguments);
  }

  rmdir() {
    return promises().applyCallback(fs(), fs().rmdir, arguments);
  }

  rmdirSync() {
    return fs().rmdirSync(...arguments);
  }

  rmrf() {
    return promises().applyCallback(null, rimraf(), arguments);
  }

  rmrfSync() {
    return rimraf().sync(...arguments);
  }

  sanitizeFilename() {
    return sanitizeFilename()(...arguments);
  }

  stat() {
    return promises().applyCallback(fs(), fs().stat, arguments);
  }

  statSync() {
    return fs().statSync(...arguments);
  }

  symlink() {
    return promises().applyCallback(fs(), fs().symlink, arguments);
  }

  symlinkSync() {
    return fs().symlinkSync(...arguments);
  }

  toNamespacedPath() {
    return path().toNamespacedPath(...arguments);
  }

  touch() {
    return touch().apply(null, arguments);
  }

  truncate() {
    return promises().applyCallback(fs(), fs().truncate, arguments);
  }

  truncateSync() {
    return fs().truncateSync(...arguments);
  }

  unlink() {
    return promises().applyCallback(fs(), fs().unlink, arguments);
  }

  unlinkSync() {
    return fs().unlinkSync(...arguments);
  }

  unwatchFile() {
    return fs().unwatchFile(...arguments);
  }

  utimes() {
    return promises().applyCallback(fs(), fs().utimes, arguments);
  }

  utimesSync() {
    return fs().utimesSync(...arguments);
  }

  watch() {
    return promises().applyCallback(fs(), fs().watch, arguments);
  }

  watchFile() {
    return fs().watchFile(...arguments);
  }

  write() {
    return promises().applyCallback(fs(), fs().write, arguments);
  }

  writeFile() {
    return promises().applyCallback(fs(), fs().writeFile, arguments);
  }

  writeFileSync() {
    return fs().writeFileSync(...arguments);
  }

  writeSync() {
    return fs().writeSync(...arguments);
  }

  get FileReadStream() {
    return fs().FileReadStream.bind(fs());
  }

  get FileWriteStream() {
    return fs().FileWriteStream.bind(fs());
  }

  get ReadStream() {
    return fs().ReadStream.bind(fs());
  }

  get Stats() {
    return fs().Stats.bind(fs());
  }

  get WriteStream() {
    return fs().WriteStream.bind(fs());
  }

  get constants() {
    return fs().constants;
  }

  get delimiter() {
    return path().delimiter;
  }

  get posix() {
    return path().posix;
  }

  get sep() {
    return path().sep;
  }

  get win32() {
    return path().win32;
  }
};

const dependencies = {};
function get(dependency) {
  return (
    dependencies[dependency] || (dependencies[dependency] = require(dependency))
  );
}

function childProcess() {
  return get("child_process");
}
function fs() {
  // Using graceful-fs over vanilla fs solves the following problem:
  // Error: EMFILE: too many open files

  // See
  // https://stackoverflow.com/questions/8965606/node-and-error-emfile-too-many-open-files.

  return get("graceful-fs");
}
function mkdirp() {
  return get("mkdirp");
}
function ncp() {
  return get("ncp");
}
function objects() {
  return get("@util.js/objects");
}
function path() {
  return get("path");
}
function promises() {
  return get("@util.js/promises");
}
function readLastLines() {
  return get("read-last-lines");
}
function rimraf() {
  return get("rimraf");
}
function sanitizeFilename() {
  return get("sanitize-filename");
}
function strings() {
  return get("@util.js/strings");
}
function touch() {
  return get("touch");
}
