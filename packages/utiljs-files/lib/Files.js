"use strict";

module.exports = function Files(options) {
  function _asyncwaterfall() {
    return options.asyncwaterfall();
  }
  function _child_process() {
    return options.child_process();
  }
  function fs() {
    return options.fs();
  }
  function _fs() {
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
  function _strings() {
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

  this.diff = Files_diff;
  function Files_diff(pathA, pathB, cb) {
    if (!objects().isDefined(pathA)) throw "pathA cannot be undefined";
    if (!objects().isDefined(pathB)) throw "pathB cannot be undefined";
    var diff = _child_process().spawn("diff", [pathA, pathB]);
    diff.on("close", code => {
      cb(null, code === 0);
    });
    diff.on("error", err => {
      cb(err);
    });
  }

  this.filesWithExtension = Files_filesWithExtension;
  function Files_filesWithExtension(opts, cb) {
    if (!cb)
      return promises().promisifyAndCall(this, Files_filesWithExtension, opts);

    if (!objects().isDefined(opts)) {
      cb("opts cannot be undefined");
      return;
    }
    if (typeof cb !== "function") {
      throw "cb must be a function";
      return;
    }

    var dir = opts.dir;
    var ext = opts.ext;

    if (!objects().isDefined(dir)) {
      cb("dir cannot be undefined");
      return;
    }
    if (!objects().isDefined(ext)) {
      cb("ext cannot be undefined");
      return;
    }

    _fs().readdir(dir, (err, files) => {
      if (objects().isDefined(err)) {
        cb(err);
        return;
      }
      var filesWithExt = [];

      var divider = _strings().endsWith(dir, "/") ? "" : "/";

      function Files_filesWithExtension_forEach(file) {
        if (_strings().endsWith(file.toLowerCase(), "." + ext)) {
          filesWithExt.push(dir + divider + file);
        }
      }
      files.forEach(Files_filesWithExtension_forEach);
      cb(null, filesWithExt);
    });
  }

  /**
   * Does not recursively search for files.
   * When specifying ext, do not include the period.
   */
  this.filesWithExtensionSync = Files_filesWithExtensionSync;
  function Files_filesWithExtensionSync(opts) {
    var dir = opts.dir;
    var ext = opts.ext;

    if (!objects().isDefined(dir)) throw "dir cannot be undefined";
    if (!objects().isDefined(ext)) throw "ext cannot be undefined";

    var files = _fs().readdirSync(dir);
    var filesWithExt = [];

    var divider = _strings().endsWith(dir, "/") ? "" : "/";

    function Files_filesWithExtension_forEach(file) {
      if (_strings().endsWith(file.toLowerCase(), "." + ext)) {
        filesWithExt.push(dir + divider + file);
      }
    }
    files.forEach(Files_filesWithExtension_forEach);
    return filesWithExt;
  }

  this.isDirectory = Files_isDirectory;
  function Files_isDirectory(path, cb) {
    _fs().lstat(path, function(err, stats) {
      if (objects().isDefined(err)) {
        cb(err, null);
        return;
      }
      cb(null, stats.isDirectory());
    });
  }

  this.isDirectorySync = Files_isDirectorySync;
  function Files_isDirectorySync(path) {
    return _fs()
      .lstatSync(path)
      .isDirectory();
  }

  this.isFile = Files_isFile;
  function Files_isFile(path, callback) {
    if (!callback) {
      return promises().promisifyAndCall(this, Files_isFile, path);
    }
    _fs().lstat(path, function(err, stats) {
      if (objects().isDefined(err)) {
        callback(err, null);
        return;
      }
      callback(null, stats.isFile());
    });
  }

  this.isFileSync = Files_isFileSync;
  function Files_isFileSync(path) {
    return _fs()
      .lstatSync(path)
      .isFile();
  }

  this.mkdirp = function(path, cb) {
    return promises().call(null, mkdirp(), arguments);
  };

  this.mkdirpSync = function(dir, opts) {
    return mkdirp().sync(dir, opts);
  };

  this.readdir = promises().promisify(fs().readdir);

  this.readFile = readFile;
  function readFile() {
    return wrapCallback(arguments, readFile, _fs().readFile);
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
      tasks.push(_fs().readFile);
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
    return wrapCallback(arguments, writeFile, _fs().writeFile);
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
