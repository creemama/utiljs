"use strict";

const { expect } = require("chai"),
  Factory = require("../lib/FilesFactory"),
  Files = require("../lib/Files"),
  Resources = require("../lib/FilesResources");

describe("Files", function() {
  const resources = new Resources();
  const fs = resources.fs();
  const waterfall = resources.asyncwaterfall();
  const targetDir = __dirname + "/../target";
  const emptyDir = targetDir + "/emptyDir";
  const files = new Factory().newFiles();
  const jsonDir = targetDir + "/filesWithExtension";
  files.mkdirpSync(targetDir);
  files.mkdirpSync(emptyDir);

  async function prepareDirWithJsonFiles() {
    await files.mkdirp(jsonDir);
    await files.touch(jsonDir + "/.DS_Store");
    await files.touch(jsonDir + "/.gitignore");
    await files.mkdirp(jsonDir + "/json");
    await files.mkdirp(jsonDir + "/lib");
    await files.mkdirp(jsonDir + "/node_modules");
    await files.touch(jsonDir + "/package.json");
    await files.mkdirp(jsonDir + "/public");
    await files.touch(jsonDir + "/server.json");
    await files.mkdirp(jsonDir + "/target");
    await files.touch(jsonDir + "/tasks.JSON");
    await files.mkdirp(jsonDir + "/test");
    await files.mkdirp(jsonDir + "/views");
  }

  describe("#cp(src, dest)", function() {
    it("should successfully copy a file", async function() {
      const src = targetDir + "/cp.txt";
      const dest = targetDir + "/cp2.txt";
      await files.rmrf(src);
      await files.rmrf(dest);
      await files.mkdirp(targetDir);
      await files.writeFile(src, "cp", "utf8");
      await files.cp(src, dest);
      expect(await files.readFile(dest, "utf8")).to.eql("cp");
      await files.rmrf(src);
      await files.rmrf(dest);
    });
  });

  describe("#cpr(src, dest)", function() {
    it("should successfully copy a directory", async function() {
      const src = targetDir + "/cprA";
      const src0 = src + "/0.txt";
      const src1 = src + "/1.txt";
      const src2 = src + "/2.txt";
      const dest = targetDir + "/cprB";
      const dest0 = dest + "/0.txt";
      await files.rmrf(src);
      await files.rmrf(dest);
      await files.mkdirp(src);
      await files.mkdirp(dest);
      await files.writeFile(src0, "cp", "utf8");
      await files.touch(src1);
      await files.touch(src2);
      await files.cpr(src, dest);
      expect(await files.readFile(dest0, "utf8")).to.eql("cp");
      expect(await files.readdir(dest)).to.eql(["0.txt", "1.txt", "2.txt"]);
      await files.rmrf(src);
      await files.rmrf(dest);
    });
  });

  describe("#diff(pathA, pathB, cb)", function() {
    it("should throw an exception if pathA is undefined", () => {
      expect(function() {
        files.diff();
      }).to.throw("pathA cannot be undefined");
    });
    it("should throw an exception if pathA is null", () => {
      expect(function() {
        files.diff(null, "/not/a/path");
      }).to.throw("pathA cannot be undefined");
    });
    it("should throw an exception if pathB is undefined", () => {
      expect(function() {
        files.diff("/not/a/path");
      }).to.throw("pathB cannot be undefined");
    });
    it("should throw an exception if pathB is null", () => {
      expect(function() {
        files.diff("/not/a/path", null);
      }).to.throw("pathB cannot be undefined");
    });
    it("should return false if neither path exists", done => {
      files.diff("/not/a/path", "/not/a/path", (err, code) => {
        expect(err).to.be.null;
        expect(code).to.equal(false);
        done();
      });
    });
    it("should return true if both paths are the same directory", done => {
      files.diff(__dirname, __dirname, (err, code) => {
        expect(err).to.be.null;
        expect(code).to.equal(true);
        done();
      });
    });
    it("should return true if both paths are the same file", done => {
      files.diff(
        __dirname + "/FilesTest.js",
        __dirname + "/FilesTest.js",
        (err, code) => {
          expect(err).to.be.null;
          expect(code).to.equal(true);
          done();
        }
      );
    });
    it("should return false if both paths are different file", done => {
      files.diff(
        __dirname + "/FilesTest.js",
        __dirname + "/StreamsTest.js",
        (err, code) => {
          expect(err).to.be.null;
          expect(code).to.equal(false);
          done();
        }
      );
    });
    it("should return false if both paths are different directories", done => {
      files.diff(__dirname, __dirname + "/support", (err, code) => {
        expect(err).to.be.null;
        expect(code).to.equal(false);
        done();
      });
    });
  });

  describe("#filesWithExtension()", () => {
    it("should throw a TypeError if caller does not specify any arguments", () => {
      return files
        .filesWithExtension()
        .then(() => expect.fail())
        .catch(error => expect(error).to.eq("opts cannot be undefined"));
    });
    it("should return an error if callback specified and caller does not specify any arguments", cb => {
      files.filesWithExtension(null, err => {
        expect(err).to.equal("opts cannot be undefined");
        cb();
      });
    });
    it("should throw an exception if opts is empty", () => {
      return files
        .filesWithExtension({})
        .then(() => expect.fail())
        .catch(error => expect(error).to.eq("dir cannot be undefined"));
    });
    it("should return an error if callback specified and opts is empty", cb => {
      files.filesWithExtension({}, err => {
        expect(err).to.equal("dir cannot be undefined");
        cb();
      });
    });
    it("should throw an exception if dir and ext are null", () => {
      return files
        .filesWithExtension({ dir: null, ext: null })
        .then(() => expect.fail())
        .catch(error => expect(error).to.eq("dir cannot be undefined"));
    });
    it("should return an error if callback is specified and dir and ext are null", cb => {
      files.filesWithExtension({ dir: null, ext: null }, err => {
        expect(err).to.equal("dir cannot be undefined");
        cb();
      });
    });
    it("should throw an exception if only ext is null", () => {
      return files
        .filesWithExtension({ dir: ".", ext: null })
        .then(() => expect.fail())
        .catch(error => expect(error).to.eq("ext cannot be undefined"));
    });
    it("should return an error if callback specified and only ext is null", cb => {
      files.filesWithExtension({ dir: ".", ext: null }, err => {
        expect(err).to.equal("ext cannot be undefined");
        cb();
      });
    });
    it("should throw an exception if only dir is null", () => {
      return files
        .filesWithExtension({ dir: null, ext: "json" })
        .then(() => expect.fail())
        .catch(error => expect(error).to.eq("dir cannot be undefined"));
    });
    it("should return an error if only dir is null", cb => {
      files.filesWithExtension({ dir: null, ext: "json" }, err => {
        expect(err).to.equal("dir cannot be undefined");
        cb();
      });
    });
    it("should throw an exception if dir does not exist", () => {
      return files
        .filesWithExtension({ dir: "/unlikely/to/exist/dir", ext: "json" })
        .then(() => expect.fail())
        .catch(error => expect(error).to.be.an("Error"));
    });
    it("should return an error if dir does not exist", cb => {
      files.filesWithExtension(
        { dir: "/unlikely/to/exist/dir", ext: "json" },
        err => {
          expect(resources.objects().isDefined(err)).to.be.true;
          cb();
        }
      );
    });
  });

  describe("#filesWithExtension()", function() {
    it("should return [] if dir is empty", function(cb) {
      files.filesWithExtension({ dir: emptyDir, ext: "json" }, (err, f) => {
        expect(f).to.have.members([]);
        cb();
      });
    });
    it("should have a forward slash separating directory and filename in returned filenames if dir does not contain a slash at the end", cb => {
      prepareDirWithJsonFiles().then(() => {
        files.filesWithExtension({ dir: jsonDir, ext: "json" }, (err, f) => {
          expect(f).to.have.members([
            jsonDir + "/package.json",
            jsonDir + "/server.json",
            jsonDir + "/tasks.JSON"
          ]);
          cb();
        });
      });
    });
    it("should not have two forward slashes in returned filenames if dir contains a slash at the end", cb => {
      prepareDirWithJsonFiles().then(() => {
        files.filesWithExtension({ dir: jsonDir, ext: "json" }, (err, f) => {
          expect(f).to.have.members([
            jsonDir + "/package.json",
            jsonDir + "/server.json",
            jsonDir + "/tasks.JSON"
          ]);
          cb();
        });
      });
    });
    it("should return [] if there are files in dir matching ext but ext starts with a period", cb => {
      prepareDirWithJsonFiles().then(() => {
        files.filesWithExtension({ dir: jsonDir, ext: ".json" }, (err, f) => {
          expect(f).to.have.members([]);
          cb();
        });
      });
    });
    it("should return [] if ext is empty", cb => {
      prepareDirWithJsonFiles().then(() => {
        files.filesWithExtension({ dir: jsonDir, ext: "" }, (err, f) => {
          expect(f).to.have.members([]);
          cb();
        });
      });
    });
  });

  describe("#filesWithExtensionSync()", function() {
    it("should throw a TypeError if caller does not specify any arguments", function() {
      expect(function() {
        files.filesWithExtensionSync();
      }).to.throw(TypeError);
    });
    it("should throw an exception if opts is empty", function() {
      expect(function() {
        files.filesWithExtensionSync({});
      }).to.throw("dir cannot be undefined");
    });
    it("should throw an exception if dir and ext are null", function() {
      expect(function() {
        files.filesWithExtensionSync({ dir: null, ext: null });
      }).to.throw("dir cannot be undefined");
    });
    it("should throw an exception if only ext is null", function() {
      expect(function() {
        files.filesWithExtensionSync({ dir: ".", ext: null });
      }).to.throw("ext cannot be undefined");
    });
    it("should throw an exception if only dir is null", function() {
      expect(function() {
        files.filesWithExtensionSync({ dir: null, ext: "json" });
      }).to.throw("dir cannot be undefined");
    });
    it("should throw an exception if dir does not exist", function() {
      expect(function() {
        files.filesWithExtensionSync({
          dir: "/unlikely/to/exist/dir",
          ext: "json"
        });
      }).to.throw(/ENOENT.*/);
    });
    it("should return [] if dir is empty", function() {
      expect(
        files.filesWithExtensionSync({ dir: emptyDir, ext: "json" })
      ).to.have.members([]);
    });
    it("should have a forward slash separating directory and filename in returned filenames if dir does not contain a slash at the end", function() {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: "json" })
        ).to.have.members([
          jsonDir + "/package.json",
          jsonDir + "/server.json",
          jsonDir + "/tasks.JSON"
        ]);
      });
    });
    it("should not have two forward slashes in returned filenames if dir contains a slash at the end", function() {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: "json" })
        ).to.have.members([
          jsonDir + "/package.json",
          jsonDir + "/server.json",
          jsonDir + "/tasks.JSON"
        ]);
      });
    });
    it("should return [] if there are files in dir matching ext but ext starts with a period", function() {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: ".json" })
        ).to.have.members([]);
      });
    });
    it("should return [] if ext is empty", function() {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: "" })
        ).to.have.members([]);
      });
    });
  });

  describe("#isDirectory", function() {
    it("should be true for the working directory", function(done) {
      files.isDirectory(".", function(err, truth) {
        expect(err).to.be.null;
        expect(truth).to.be.ok;
        done();
      });
    });
    it("should be true for the directory containing FilesTest.js", function(done) {
      files.isDirectory(__dirname, function(err, truth) {
        expect(err).to.be.null;
        expect(truth).to.be.ok;
        done();
      });
    });
    it("should be false for FilesTest.js", function(done) {
      files.isDirectory(__dirname + "/FilesTest.js", function(err, truth) {
        expect(err).to.be.null;
        expect(truth).to.be.false;
        done();
      });
    });
    it("should error for UnlikelyToExist.js", function(done) {
      files.isDirectory(__dirname + "/UnlikelyToExist.js", function(
        err,
        truth
      ) {
        expect(err).to.be.an.instanceof(Error);
        expect(truth).to.be.null;
        done();
      });
    });
    it("should error for /unlikely/to/exist/dir/", function(done) {
      files.isDirectory("/unlikely/to/exist/dir/", function(err, truth) {
        expect(err).to.be.an.instanceof(Error);
        expect(truth).to.be.null;
        done();
      });
    });
  });

  describe("#isDirectorySync", function() {
    it("should return true for the working directory", function() {
      expect(files.isDirectorySync(".")).to.be.ok;
    });
    it("should return true for the directory containing FilesTest.js", function() {
      expect(files.isDirectorySync(__dirname)).to.be.ok;
    });
    it("should return false for FilesTest.js", function() {
      expect(files.isDirectorySync(__dirname + "/FilesTest.js")).to.be.false;
    });
    it("should throw an exception for UnlikelyToExist.js", function() {
      expect(function() {
        files.isDirectorySync(__dirname + "/UnlikelyToExist.js");
      }).to.throw(/ENOENT.*/);
    });
    it("should throw an exception for /unlikely/to/exist/dir/", function() {
      expect(function() {
        files.isDirectorySync("/unlikely/to/exist/dir/");
      }).to.throw(/ENOENT.*/);
    });
  });

  describe("#isFile", function() {
    it("should be false for the working directory", function(done) {
      files.isFile(".", function(err, truth) {
        expect(err).to.be.null;
        expect(truth).to.be.false;
        done();
      });
    });
    it("should be false for the directory containing FilesTest.js", function(done) {
      files.isFile(__dirname, function(err, truth) {
        expect(err).to.be.null;
        expect(truth).to.be.false;
        done();
      });
    });
    it("should be true for FilesTest.js", function(done) {
      files.isFile(__dirname + "/FilesTest.js", function(err, truth) {
        expect(err).to.be.null;
        expect(truth).to.be.ok;
        done();
      });
    });
    it("should error for UnlikelyToExist.js", function(done) {
      files.isFile(__dirname + "/UnlikelyToExist.js", function(err, truth) {
        expect(err).to.be.an.instanceof(Error);
        expect(truth).to.be.null;
        done();
      });
    });
    it("should error for /unlikely/to/exist/dir/", function(done) {
      files.isFile("/unlikely/to/exist/dir/", function(err, truth) {
        expect(err).to.be.an.instanceof(Error);
        expect(truth).to.be.null;
        done();
      });
    });
  });

  describe("#isFileSync", function() {
    it("should return false for the working directory", function() {
      expect(files.isFileSync(".")).to.be.false;
    });
    it("should return false for the directory containing FilesTest.js", function() {
      expect(files.isFileSync(__dirname)).to.be.false;
    });
    it("should return false for FilesTest.js", function() {
      expect(files.isFileSync(__dirname + "/FilesTest.js")).to.be.ok;
    });
    it("should throw an exception for UnlikelyToExist.js", function() {
      expect(function() {
        files.isFileSync(__dirname + "/UnlikelyToExist.js");
      }).to.throw(/ENOENT.*/);
    });
    it("should throw an exception for /unlikely/to/exist/dir/", function() {
      expect(function() {
        files.isFileSync("/unlikely/to/exist/dir/");
      }).to.throw(/ENOENT.*/);
    });
  });

  describe("#mkdirp and #rmrf", function() {
    it("should create and destroy a new directory hierarchy", function(done) {
      var testDir = targetDir + "/this/is/a/nested/dir";
      waterfall(
        [
          function(cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function(cb) {
            expect(function() {
              files.isDirectorySync(targetDir);
            }).to.throw(/ENOENT.*/);
            cb(null);
          },
          function(cb) {
            cb(null, testDir);
          },
          files.mkdirp,
          function(make, cb) {
            expect(files.isDirectorySync(testDir)).to.be.true;
            cb(null);
          },
          function(cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function(cb) {
            expect(function() {
              files.isDirectorySync(testDir);
            }).to.throw(/ENOENT.*/);
            expect(function() {
              files.isDirectorySync(targetDir);
            }).to.throw(/ENOENT.*/);
            cb(null);
          }
        ],
        done
      );
    });
  });

  describe("#rmrf", function() {
    it("should delete files", function(done) {
      var testFile = targetDir + "/frog.txt";
      files.mkdirpSync(targetDir);
      files.closeSync(files.openSync(testFile, "w"));
      waterfall(
        [
          function(cb) {
            cb(null, testFile);
          },
          files.isFile,
          function(truth, cb) {
            expect(truth).to.be.true;
            cb(null);
          },
          function(cb) {
            cb(null, testFile);
          },
          files.rmrf,
          function(cb) {
            expect(function() {
              files.isFileSync(testFile);
            }).to.throw(/ENOENT.*/);
            cb();
          }
        ],
        done
      );
    });
  });

  describe("#mkdirpSync and #rmrfSync", function() {
    it("should create and destroy a new directory hierarchy", function() {
      var testDir = targetDir + "/this/is/a/nested/dir";
      files.rmrfSync(targetDir);
      expect(function() {
        files.isDirectorySync(targetDir);
      }).to.throw(/ENOENT.*/);
      files.mkdirpSync(testDir);
      expect(files.isDirectorySync(testDir)).to.be.ok;
      files.rmrfSync(targetDir);
      expect(function() {
        files.isDirectorySync(testDir);
      }).to.throw(/ENOENT.*/);
      expect(function() {
        files.isDirectorySync(targetDir);
      }).to.throw(/ENOENT.*/);
    });
  });

  describe("#readFiles(files, options, callback)", function(done) {
    var asyncwaterfall = resources.asyncwaterfall();
    before(function(done) {
      asyncwaterfall(
        [
          function(cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function(cb) {
            cb(null, targetDir);
          },
          files.mkdirp,
          function(made, cb) {
            cb(null, targetDir + "/a.txt", "a", "utf8");
          },
          files.writeFile,
          function(cb) {
            cb(null, targetDir + "/b.txt", "b", "utf8");
          },
          files.writeFile,
          function(cb) {
            cb(null, targetDir + "/c.txt", "c", "utf8");
          },
          files.writeFile
        ],
        done
      );
    });

    after(function(done) {
      files.rmrf(targetDir, done);
    });

    it("should successfully read three files when called without options", function(done) {
      files.readFiles(
        [targetDir + "/a.txt", targetDir + "/b.txt", targetDir + "/c.txt"],
        function(err, string) {
          expect(err).to.be.null;
          expect(string).to.equal("abc");
          done();
        }
      );
    });
    it("should successfully read three files when called with option 'utf8'", function(done) {
      files.readFiles(
        [targetDir + "/b.txt", targetDir + "/a.txt", targetDir + "/c.txt"],
        "utf8",
        function(err, string) {
          expect(err).to.be.null;
          expect(string).to.equal("bac");
          done();
        }
      );
    });
    it("should successfully read three files when called with options", function(done) {
      files.readFiles(
        [targetDir + "/c.txt", targetDir + "/a.txt", targetDir + "/c.txt"],
        { encoding: "utf8", flag: "r" },
        function(err, string) {
          expect(err).to.be.null;
          expect(string).to.equal("cac");
          done();
        }
      );
    });
    it("should successfully read three files when called with null options", function(done) {
      files.readFiles(
        [targetDir + "/c.txt", targetDir + "/a.txt", targetDir + "/c.txt"],
        null,
        function(err, string) {
          expect(err).to.be.null;
          expect(string).to.equal("cac");
          done();
        }
      );
    });
    it("should throw an error if callback is null", function() {
      expect(function() {
        files.readFiles([
          targetDir + "/c.txt",
          targetDir + "/a.txt",
          targetDir + "/c.txt"
        ]);
      }).to.throw("callback cb is not a function");
    });
    it("should throw an error if files argument is null", function() {
      expect(function() {
        files.readFiles(null, function() {});
      }).to.throw("Cannot read property 'forEach' of null");
    });
    it("should return an empty string if files argument is empty", done => {
      files.readFiles([], null, function(err, string) {
        expect(err).to.be.null;
        expect(string).to.equal("");
        done();
      });
    });
    it("should throw an error if files does not have a forEach method", function() {
      expect(function() {
        files.readFiles("", function() {});
      }).to.throw(TypeError);
    });
    it("should return with an error if one of the files does not exist", function(done) {
      files.readFiles(
        [
          targetDir + "/c.txt",
          targetDir + "/nonexistent.txt",
          targetDir + "/b.txt"
        ],
        null,
        function(err, string) {
          expect(err).to.not.be.null;
          expect(err).to.not.be.undefined;
          expect(string).to.be.undefined;
          done();
        }
      );
    });
  });

  describe("#touch(filename, options, cb)", function() {
    before(function(done) {
      waterfall(
        [
          function(cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function(cb) {
            cb(null, targetDir);
          },
          files.mkdirp
        ],
        done
      );
    });

    after(function(done) {
      files.rmrf(targetDir, done);
    });

    it("should create an empty file", function(done) {
      var touchFile = targetDir + "/foo.bar";
      expect(function() {
        files.isFileSync(touchFile);
      }).to.throw(/ENOENT.*/);
      waterfall(
        [
          function(cb) {
            cb(null, touchFile, null);
          },
          files.touch,
          function(res, cb) {
            expect(res).to.be.undefined;
            cb(null, touchFile);
          },
          files.isFile,
          function(truth, cb) {
            expect(truth).to.be.ok;
            cb(null, touchFile);
          },
          files.rmrf,
          function(cb) {
            cb(null, touchFile);
          },
          files.touch,
          function(res, cb) {
            expect(res).to.be.undefined;
            cb(null, touchFile);
          },
          files.isFile
        ],
        done
      );
    });
    it("should throw TypeError when filename is null", async function() {
      await files
        .touch()
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
      await files
        .touch(null)
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
    });
  });
});
