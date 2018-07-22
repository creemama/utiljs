"use strict";

module.exports = function Files(options) {
  function _asyncwaterfall() {
    return options.asyncwaterfall();
  }
  function childProcess() {
    return options.child_process();
  }
  function fs() {
    return options.fs();
  }
  function mkdirp() {
    return options.mkdirp();
  }
  function ncp() {
    return options.ncp();
  }
  function objects() {
    return options.objects();
  }
  function path() {
    return options.path();
  }
  function promises() {
    return options.promises();
  }
  function rimraf() {
    return options.rimraf();
  }
  function strings() {
    return options.strings();
  }
  function touch() {
    return options.touch();
  }

  Object.assign(this, fs());
  Object.assign(this, path());

  this.cp = cp;
  function cp() {
    return promises().call(fs(), fs().copyFile, arguments);
  }

  this.cpr = cpr;
  function cpr() {
    return promises().call(null, ncp(), arguments);
  }

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

  this.lstat = lstat;
  function lstat() {
    return promises().applyCallback(fs(), fs().lstat, arguments);
  }

  this.lstatSync = fs().lstatSync;

  this.mkdirp = function(path, cb) {
    return promises().call(null, mkdirp(), arguments);
  };

  this.mkdirpSync = function(dir, opts) {
    return mkdirp().sync(dir, opts);
  };

  this.readdir = promises().promisify(fs().readdir);

  this.readFile = readFile;
  function readFile() {
    return wrapCallback(arguments, readFile, fs().readFile);
  }

  this.readFiles = Files_readFiles;
  function Files_readFiles(files, options, cb) {
    var opts;
    var caba;
    if (typeof options === "function") {
      opts = {};
      caba = options;
    } else {
      opts = options;
      caba = cb;
    }
    if (typeof caba !== "function") {
      throw "callback cb is not a function";
    }
    var string = "";
    var tasks = [];
    tasks.push(Files_readFiles_start);
    files.forEach(function(file) {
      tasks.push(Files_readFiles_readFile.bind({ file: file }));
      tasks.push(fs().readFile);
    });
    _asyncwaterfall()(tasks, Files_readFiles_end);
    function Files_readFiles_start(callback) {
      callback(null, "");
    }
    function Files_readFiles_readFile(str, callback) {
      string += str;
      callback(null, this.file, opts);
    }
    function Files_readFiles_end(err, str) {
      string += str;
      if (objects().isDefined(err)) {
        caba(err);
        return;
      }
      caba(null, string);
    }
  }

  this.rmrf = rmrf;
  function rmrf() {
    return promises().call(null, rimraf(), arguments);
  }

  this.rmrfSync = function(path, opts) {
    return rimraf().sync(path, opts);
  };

  this.stat = stat;
  function stat() {
    return wrapCallback(arguments, stat, fs().stat);
  }

  this.touch = function() {
    return touch().apply(null, arguments);
  };

  this.writeFile = writeFile;
  function writeFile() {
    return wrapCallback(arguments, writeFile, fs().writeFile);
  }
};

function wrapCallback(args, localMethod, targetMethod) {
  if (hasCallback(args)) return targetMethod.apply(null, args);
  else
    return new Promise((resolve, reject) => {
      localMethod.call(null, ...args, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
}

function hasCallback(args) {
  return args.length > 0 && typeof args[args.length - 1] === "function";
}
