"use strict";

const { assert, expect } = require("chai");
const files = require("..");

describe("Files", function () {
  const waterfall = require("async-waterfall");
  const targetDir = files.join(__dirname, "..", "target");
  const emptyDir = targetDir + "/emptyDir";
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

  describe("#readLastLines()", () => {
    it("should read the last n lines of a file", async function () {
      let lines;

      lines = await files.readLastLines(__filename, 3);
      expect(lines).to.eql("    });\n  });\n});\n");

      lines = await files.readLastLines(__filename, 3, "utf8");
      expect(lines).to.eql("    });\n  });\n});\n");

      lines = await files.readLastLines(__filename, 3, "buffer");
      expect(lines).to.be.an.instanceof(Buffer);
      expect(lines.toString("utf8")).to.eql("    });\n  });\n});\n");

      if (global.URL) {
        lines = await files.readLastLines(
          new URL("file://" + __filename),
          3,
          "utf8"
        );
        expect(lines).to.eql("    });\n  });\n});\n");
      }

      lines = await files.readLastLines(
        Buffer.from(__filename, "utf8"),
        3,
        "utf8"
      );
      expect(lines).to.eql("    });\n  });\n});\n");

      lines = await files.readLastLines(
        Buffer.from(__filename, "utf8"),
        3,
        Buffer.from("utf8", "utf8")
      );
      expect(lines).to.eql("    });\n  });\n});\n");
    });
    it("should read the last n lines of a file without an encoding and with a callback", (callback) => {
      files.readLastLines(__filename, 3, (error, lines) => {
        if (error) {
          callback(error);
          return;
        }
        try {
          expect(lines).to.eql("    });\n  });\n});\n");
          callback();
        } catch (e) {
          callback(e);
        }
      });
    });
    it("should read the last n lines of a file with an encoding and with a callback", (callback) => {
      files.readLastLines(__filename, 3, "utf8", (error, lines) => {
        if (error) {
          callback(error);
          return;
        }
        try {
          expect(lines).to.eql("    });\n  });\n});\n");
          callback();
        } catch (e) {
          callback(e);
        }
      });
    });
    it("should read the last n lines with weird maxLineCounts", async function () {
      let lines;

      const src = targetDir + "/readLastLines.txt";
      await files.mkdirp(targetDir);
      await files.writeFile(src, "a", "utf8");

      lines = await files.readLastLines(src, Buffer.from("3", "utf8"));
      expect(lines).to.eql("a");

      lines = await files.readLastLines(src, null);
      expect(lines).to.eql("");

      lines = await files.readLastLines(src, false);
      expect(lines).to.eql("");

      lines = await files.readLastLines(src, undefined);
      expect(lines).to.eql("a");

      lines = await files.readLastLines(src, "5");
      expect(lines).to.eql("a");

      lines = await files.readLastLines(src, "0");
      expect(lines).to.eql("");

      lines = await files.readLastLines(src, files);
      expect(lines).to.eql("a");

      lines = await files.readLastLines(src, Number.NEGATIVE_INFINITY);
      expect(lines).to.eql("");

      lines = await files.readLastLines(__filename, -1);
      expect(lines).to.eql("");

      lines = await files.readLastLines(__filename, 0);
      expect(lines).to.eql("");

      lines = await files.readLastLines(__filename, 2.3);
      expect(lines).to.eql("    });\n  });\n});\n");

      lines = await files.readLastLines(src, Number.POSITIVE_INFINITY);
      expect(lines).to.eql("a");

      lines = await files.readLastLines(src, NaN);
      expect(lines).to.eql("a");
    });
    it("should read the last n lines with weird encodings", async function () {
      const lines = await files.readLastLines(__filename, 3, null);
      expect(lines).to.eql("    });\n  });\n});\n");
    });
    it("should fail if the path argument is invalid", async function () {
      // The method fails if a URL as a string, not a URL object.
      await files
        .readLastLines("file://" + __filename, 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error.message).to.eql("file does not exist"));

      // The method fails if a URL does not use the file scheme.
      await files
        .readLastLines("http://www.google.com", 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error.message).to.eql("file does not exist"));
      if (global.URL)
        await files
          .readLastLines(new URL("http://www.google.com"), 3)
          .then((lines) => assert.fail())
          .catch((error) =>
            expect(error.message).to.eql("The URL must be of scheme file")
          );

      // The method fails if path is a directory.
      await files
        .readLastLines(__dirname, 3)
        .then((lines) => assert.fail())
        .catch((error) =>
          expect(error.message).to.eql(
            "EISDIR: illegal operation on a directory, read"
          )
        );

      // The method fails if path is one of the primitive types other than string.
      await files
        .readLastLines(true, 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      await files
        .readLastLines(null, 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      await files
        .readLastLines(undefined, 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      await files
        .readLastLines(1, 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      await files
        .readLastLines(Symbol(__filename), 3)
        .then((lines) => assert.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should fail with a callback if the path argument is invalid", (callback) => {
      files.readLastLines(__dirname, 3, (error, lines) => {
        try {
          expect(error.message).to.eql(
            "EISDIR: illegal operation on a directory, read"
          );
          callback();
        } catch (e) {
          callback(e);
        }
      });
    });
    it("should fail if the maxLineCount is invalid", async function () {
      await files
        .readLastLines(__filename, Symbol("5"))
        .then((lines) => assert.fail())
        .catch((error) =>
          expect(error.message).to.eql(
            "Cannot convert a Symbol value to a number"
          )
        );
    });
    it("should fail if the encoding is invalid", async function () {
      await files
        .readLastLines(__filename, 3, false)
        .then((lines) => assert.fail())
        .catch((error) =>
          expect(error.message).to.eql("Unknown encoding: false")
        );

      await files
        .readLastLines(__filename, 3, NaN)
        .then((lines) => assert.fail())
        .catch((error) =>
          expect(error.message).to.eql("Unknown encoding: NaN")
        );

      await files
        .readLastLines(__filename, 3, 0)
        .then((lines) => assert.fail())
        .catch((error) => expect(error.message).to.eql("Unknown encoding: 0"));

      await files
        .readLastLines(__filename, 3, "")
        .then((lines) => assert.fail())
        .catch((error) => expect(error.message).to.eql("Unknown encoding: "));

      await files
        .readLastLines(__filename, 3, "frog")
        .then((lines) => assert.fail())
        .catch((error) =>
          expect(error.message).to.eql("Unknown encoding: frog")
        );

      await files
        .readLastLines(__filename, 3, Symbol("utf8"))
        .then((lines) => assert.fail())
        .catch((error) =>
          expect(error.message).to.eql(
            "Cannot convert a Symbol value to a string"
          )
        );
    });
  });

  describe("#cp(src, dest)", function () {
    it("should successfully copy a file", async function () {
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

  describe("#cpr(src, dest)", function () {
    it("should successfully copy a directory", async function () {
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

  describe("#diff(pathA, pathB, cb)", function () {
    it("should error if pathA is undefined", (callback) => {
      let pathA;
      files.diff(pathA, "/not/a/path", (error, result) => {
        expect(error).to.be.an.instanceof(TypeError);
        callback();
      });
    });
    it("should error if pathA is null", (callback) => {
      files.diff(null, "/not/a/path", (error, result) => {
        expect(error).to.be.an.instanceof(TypeError);
        callback();
      });
    });
    it("should error if pathB is undefined", (callback) => {
      let pathB;
      files.diff("/not/a/path", pathB, (error, result) => {
        expect(error).to.be.an.instanceof(TypeError);
        callback();
      });
    });
    it("should error if pathB is null", (callback) => {
      files.diff("/not/a/path", null, (error, result) => {
        expect(error).to.be.an.instanceof(TypeError);
        callback();
      });
    });
    it("should return false if neither path exists", (callback) => {
      files.diff("/not/a/path", "/not/a/path", (error, result) => {
        expect(error).to.be.null;
        expect(result).to.be.false;
        callback();
      });
    });
    it("should return true if both paths are the same directory", (callback) => {
      files.diff(__dirname, __dirname, (error, result) => {
        expect(error).to.be.null;
        expect(result).to.be.ok;
        callback();
      });
    });
    it("should return true if both paths are the same file", (callback) => {
      files.diff(__filename, __filename, (error, result) => {
        expect(error).to.be.null;
        expect(result).to.be.ok;
        callback();
      });
    });
    it("should resolve to true if both paths are the same file", async function () {
      expect(await files.diff(__filename, __filename)).to.be.ok;
    });
    it("should return false if both paths are different files", (callback) => {
      const pathA = files.join(__dirname, "FilesTest.js");
      const pathB = files.join(__dirname, "..", "index.js");
      expect(files.isFile(pathA)).to.be.ok;
      expect(files.isFile(pathB)).to.be.ok;
      files.diff(pathA, pathB, (error, result) => {
        expect(error).to.be.null;
        expect(result).to.be.false;
        callback();
      });
    });
    it("should return false if both paths are different directories", (callback) => {
      files.diff(__dirname, files.join(__dirname, ".."), (error, result) => {
        expect(error).to.be.null;
        expect(result).to.be.false;
        callback();
      });
    });
  });

  describe("#filesWithExtension()", () => {
    it("should throw a TypeError if caller does not specify any arguments", () => {
      return files
        .filesWithExtension()
        .then(() => expect.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should error if a callback is specified and caller does not specify any arguments", (done) => {
      files.filesWithExtension(null, (error) => {
        try {
          expect(error).to.be.an.instanceof(TypeError);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should error if params is empty", () => {
      return files
        .filesWithExtension({})
        .then(() => expect.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should error if callback is specified and params is empty", (done) => {
      files.filesWithExtension({}, (error) => {
        try {
          expect(error).to.be.an.instanceof(TypeError);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should error if dir and ext are null", () => {
      return files
        .filesWithExtension({ dir: null, ext: null })
        .then(() => expect.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should return an error if callback is specified and dir and ext are null", (done) => {
      files.filesWithExtension({ dir: null, ext: null }, (error) => {
        try {
          expect(error).to.be.an.instanceof(TypeError);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should error if only ext is null", () => {
      return files
        .filesWithExtension({ dir: ".", ext: null })
        .then(() => expect.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should error if callback is specified and only ext is null", (done) => {
      files.filesWithExtension({ dir: ".", ext: null }, (error) => {
        try {
          expect(error).to.be.an.instanceof(TypeError);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should throw an exception if only dir is null", () => {
      return files
        .filesWithExtension({ dir: null, ext: "json" })
        .then(() => expect.fail())
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should error if only dir is null", (done) => {
      files.filesWithExtension({ dir: null, ext: "json" }, (error) => {
        try {
          expect(error).to.be.an.instanceof(TypeError);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should throw an exception if dir does not exist", () => {
      return files
        .filesWithExtension({ dir: "/unlikely/to/exist/dir", ext: "json" })
        .then(() => expect.fail())
        .catch((error) => {
          expect(error).to.be.an.instanceof(Error);
          expect(error.toString()).to.include("ENOENT");
        });
    });
    it("should error if dir does not exist", (done) => {
      files.filesWithExtension(
        { dir: "/unlikely/to/exist/dir", ext: "json" },
        (error) => {
          try {
            expect(error).to.be.an.instanceof(Error);
            expect(error.toString()).to.include("ENOENT");
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
    it("should return [] if dir is empty", (done) => {
      files.filesWithExtension(
        { dir: emptyDir, ext: "json" },
        (error, result) => {
          if (error) {
            done(error);
            return;
          }
          try {
            expect(result).to.have.members([]);
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
    it("should have a forward slash separating directory and filename in returned filenames if dir does not contain a slash at the end", async function () {
      await prepareDirWithJsonFiles();
      const result = await files.filesWithExtension({
        dir: jsonDir,
        ext: "json",
      });
      expect(result).to.have.members([
        jsonDir + "/package.json",
        jsonDir + "/server.json",
        jsonDir + "/tasks.JSON",
      ]);
    });
    it("should not have two forward slashes in returned filenames if dir contains a slash at the end", (done) => {
      prepareDirWithJsonFiles().then(() => {
        files.filesWithExtension(
          { dir: jsonDir + "/", ext: "json" },
          (error, result) => {
            if (error) {
              done(error);
              return;
            }
            try {
              expect(result).to.have.members([
                jsonDir + "/package.json",
                jsonDir + "/server.json",
                jsonDir + "/tasks.JSON",
              ]);
              done();
            } catch (err) {
              done(err);
            }
          }
        );
      });
    });
    it("should return [] if there are files in dir matching ext but ext starts with a period", async function () {
      await prepareDirWithJsonFiles();
      const result = await files.filesWithExtension({
        dir: jsonDir,
        ext: ".json",
      });
      expect(result).to.have.members([]);
    });
    it("should return [] if ext is empty", (done) => {
      prepareDirWithJsonFiles().then(() => {
        files.filesWithExtension({ dir: jsonDir, ext: "" }, (error, result) => {
          if (error) {
            done(error);
            return;
          }
          try {
            expect(result).to.have.members([]);
            done();
          } catch (err) {
            done(err);
          }
        });
      });
    });
  });

  describe("#filesWithExtensionSync()", function () {
    it("should throw a TypeError if caller does not specify any arguments", function () {
      expect(function () {
        files.filesWithExtensionSync();
      }).to.throw(TypeError);
    });
    it("should throw an exception if opts is empty", function () {
      expect(function () {
        files.filesWithExtensionSync({});
      }).to.throw(TypeError);
    });
    it("should throw an exception if dir and ext are null", function () {
      expect(function () {
        files.filesWithExtensionSync({ dir: null, ext: null });
      }).to.throw(TypeError);
    });
    it("should throw an exception if only ext is null", function () {
      expect(function () {
        files.filesWithExtensionSync({ dir: ".", ext: null });
      }).to.throw(TypeError);
    });
    it("should throw an exception if only dir is null", function () {
      expect(function () {
        files.filesWithExtensionSync({ dir: null, ext: "json" });
      }).to.throw(TypeError);
    });
    it("should throw an exception if dir does not exist", function () {
      expect(function () {
        files.filesWithExtensionSync({
          dir: "/unlikely/to/exist/dir",
          ext: "json",
        });
      }).to.throw(/ENOENT.*/);
    });
    it("should return [] if dir is empty", function () {
      expect(
        files.filesWithExtensionSync({ dir: emptyDir, ext: "json" })
      ).to.have.members([]);
    });
    it("should have a forward slash separating directory and filename in returned filenames if dir does not contain a slash at the end", function () {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: "json" })
        ).to.have.members([
          jsonDir + "/package.json",
          jsonDir + "/server.json",
          jsonDir + "/tasks.JSON",
        ]);
      });
    });
    it("should not have two forward slashes in returned filenames if dir contains a slash at the end", function () {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: "json" })
        ).to.have.members([
          jsonDir + "/package.json",
          jsonDir + "/server.json",
          jsonDir + "/tasks.JSON",
        ]);
      });
    });
    it("should return [] if there are files in dir matching ext but ext starts with a period", function () {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: ".json" })
        ).to.have.members([]);
      });
    });
    it("should return [] if ext is empty", function () {
      return prepareDirWithJsonFiles().then(() => {
        expect(
          files.filesWithExtensionSync({ dir: jsonDir, ext: "" })
        ).to.have.members([]);
      });
    });
  });

  describe("#isDirectory", function () {
    it("should be true for the working directory", (done) => {
      files.isDirectory(".", function (error, truth) {
        try {
          expect(error).to.be.null;
          expect(truth).to.be.ok;
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should be true for the directory containing FilesTest.js", async function () {
      const truth = await files.isDirectory(__dirname);
      expect(truth).to.be.ok;
    });
    it("should be false for FilesTest.js", (done) => {
      files.isDirectory(
        files.join(__dirname, "FilesTest.js"),
        function (error, truth) {
          try {
            expect(error).to.be.null;
            expect(truth).to.be.false;
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
    it("should error for UnlikelyToExist.js", async function () {
      try {
        await files.isDirectory(files.join(__dirname, "UnlikelyToExist.js"));
        expect.fail("We expected #isDirectory to throw an exception.");
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
      }
    });
    it("should error for /unlikely/to/exist/dir/", (done) => {
      files.isDirectory("/unlikely/to/exist/dir/", (error, truth) => {
        try {
          expect(error).to.be.an.instanceof(Error);
          expect(truth).to.be.undefined;
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("#isDirectorySync", () => {
    it("should return true for the working directory", () => {
      expect(files.isDirectorySync(".")).to.be.ok;
    });
    it("should return true for the directory containing FilesTest.js", () => {
      expect(files.isDirectorySync(__dirname)).to.be.ok;
    });
    it("should return false for FilesTest.js", () => {
      expect(files.isDirectorySync(files.join(__dirname, "FilesTest.js"))).to.be
        .false;
    });
    it("should throw an exception for UnlikelyToExist.js", () => {
      expect(() => {
        files.isDirectorySync(files.join(__dirname, "UnlikelyToExist.js"));
      }).to.throw(/ENOENT.*/);
    });
    it("should throw an exception for /unlikely/to/exist/dir/", () => {
      expect(() => {
        files.isDirectorySync("/unlikely/to/exist/dir/");
      }).to.throw(/ENOENT.*/);
    });
  });

  describe("#isFile", function () {
    it("should be false for the working directory", (done) => {
      files.isFile(".", function (error, truth) {
        try {
          expect(error).to.be.null;
          expect(truth).to.be.false;
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should be false for the directory containing FilesTest.js", async function () {
      const truth = await files.isFile(__dirname);
      expect(truth).to.be.false;
    });
    it("should be true for FilesTest.js", (done) => {
      files.isFile(files.join(__dirname, "FilesTest.js"), (error, truth) => {
        try {
          expect(error).to.be.null;
          expect(truth).to.be.ok;
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should error for UnlikelyToExist.js", async function () {
      try {
        await files.isFile(files.join(__dirname, "UnlikelyToExist.js"));
        expect.fail("We expected #isFile to throw an exception.");
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
      }
    });
    it("should error for /unlikely/to/exist/dir/", (done) => {
      files.isFile("/unlikely/to/exist/dir/", function (error, truth) {
        try {
          expect(error).to.be.an.instanceof(Error);
          expect(truth).to.be.undefined;
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe("#isFileSync", () => {
    it("should return false for the working directory", () => {
      expect(files.isFileSync(".")).to.be.false;
    });
    it("should return false for the directory containing FilesTest.js", () => {
      expect(files.isFileSync(__dirname)).to.be.false;
    });
    it("should return false for FilesTest.js", () => {
      expect(files.isFileSync(files.join(__dirname, "FilesTest.js"))).to.be.ok;
    });
    it("should throw an exception for UnlikelyToExist.js", () => {
      expect(function () {
        files.isFileSync(files.join(__dirname, "UnlikelyToExist.js"));
      }).to.throw(/ENOENT.*/);
    });
    it("should throw an exception for /unlikely/to/exist/dir/", () => {
      expect(function () {
        files.isFileSync("/unlikely/to/exist/dir/");
      }).to.throw(/ENOENT.*/);
    });
  });

  describe("#mkdirp and #rmrf", function () {
    it("should create and destroy a new directory hierarchy", function (done) {
      const testDir = targetDir + "/this/is/a/nested/dir";
      waterfall(
        [
          function (cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function (cb) {
            expect(function () {
              files.isDirectorySync(targetDir);
            }).to.throw(/ENOENT.*/);
            cb(null);
          },
          function (cb) {
            cb(null, testDir);
          },
          files.mkdirp,
          function (make, cb) {
            expect(files.isDirectorySync(testDir)).to.be.true;
            cb(null);
          },
          function (cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function (cb) {
            expect(function () {
              files.isDirectorySync(testDir);
            }).to.throw(/ENOENT.*/);
            expect(function () {
              files.isDirectorySync(targetDir);
            }).to.throw(/ENOENT.*/);
            cb(null);
          },
        ],
        done
      );
    });
  });

  describe("#rmrf", function () {
    it("should delete files", function (done) {
      const testFile = targetDir + "/frog.txt";
      files.mkdirpSync(targetDir);
      files.closeSync(files.openSync(testFile, "w"));
      waterfall(
        [
          function (cb) {
            cb(null, testFile);
          },
          files.isFile.bind(files),
          function (truth, cb) {
            expect(truth).to.be.true;
            cb(null);
          },
          function (cb) {
            cb(null, testFile);
          },
          files.rmrf,
          function (cb) {
            expect(function () {
              files.isFileSync(testFile);
            }).to.throw(/ENOENT.*/);
            cb();
          },
        ],
        done
      );
    });
  });

  describe("#mkdirpSync and #rmrfSync", function () {
    it("should create and destroy a new directory hierarchy", function () {
      const testDir = targetDir + "/this/is/a/nested/dir";
      files.rmrfSync(targetDir);
      expect(function () {
        files.isDirectorySync(targetDir);
      }).to.throw(/ENOENT.*/);
      files.mkdirpSync(testDir);
      expect(files.isDirectorySync(testDir)).to.be.ok;
      files.rmrfSync(targetDir);
      expect(function () {
        files.isDirectorySync(testDir);
      }).to.throw(/ENOENT.*/);
      expect(function () {
        files.isDirectorySync(targetDir);
      }).to.throw(/ENOENT.*/);
    });
  });

  describe("#readFile(path[, options, callback]", () => {
    it("should read a file and notify a callback", (callback) => {
      files.readFile(__filename, "utf8", (error, string) => {
        if (error) return callback(error);
        expect(string.includes("use stict")).to.be.true;
        callback();
      });
    });
    it("should read a file and resolve a Promise", async function () {
      const string = await files.readFile(__filename, "utf8");
      expect(string.includes("use stict")).to.be.true;
    });
  });

  describe("#readFiles(files, options, callback)", function (done) {
    before(function (done) {
      waterfall(
        [
          function (cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function (cb) {
            cb(null, targetDir);
          },
          files.mkdirp,
          function (made, cb) {
            cb(null, targetDir + "/a.txt", "a", "utf8");
          },
          files.writeFile,
          function (cb) {
            cb(null, targetDir + "/b.txt", "b", "utf8");
          },
          files.writeFile,
          function (cb) {
            cb(null, targetDir + "/c.txt", "c", "utf8");
          },
          files.writeFile,
        ],
        done
      );
    });

    after(function (done) {
      files.rmrf(targetDir, done);
    });

    it("should successfully read three files when called without options", (done) => {
      files.readFiles(
        [targetDir + "/a.txt", targetDir + "/b.txt", targetDir + "/c.txt"],
        (error, string) => {
          try {
            expect(error).to.be.null;
            expect(string).to.equal("abc");
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
    it("should successfully read three files when called with option 'utf8'", (done) => {
      files.readFiles(
        [targetDir + "/b.txt", targetDir + "/a.txt", targetDir + "/c.txt"],
        "utf8",
        (error, string) => {
          try {
            expect(error).to.be.null;
            expect(string).to.equal("bac");
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
    it("should successfully read three files when called with options", async function () {
      const string = await files.readFiles(
        [targetDir + "/c.txt", targetDir + "/a.txt", targetDir + "/c.txt"],
        { encoding: "utf8", flag: "r" }
      );
      expect(string).to.equal("cac");
    });
    it("should successfully read three files when called with null options", (done) => {
      files.readFiles(
        [targetDir + "/c.txt", targetDir + "/a.txt", targetDir + "/c.txt"],
        null,
        (error, string) => {
          try {
            expect(error).to.be.null;
            expect(string).to.equal("cac");
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
    it("should return a Promise if callback is null", async function () {
      const string = await files.readFiles([
        targetDir + "/c.txt",
        targetDir + "/a.txt",
        targetDir + "/c.txt",
      ]);
      expect(string).to.equal("cac");
    });
    it("should throw an error if files argument is null", (done) => {
      files.readFiles(null, (error, string) => {
        try {
          expect(error).to.be.an.instanceof(TypeError);
          expect(string).to.be.undefined;
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should return an empty string if files argument is empty", (done) => {
      files.readFiles([], null, (error, string) => {
        try {
          expect(error).to.be.null;
          expect(string).to.equal("");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should return an empty string when given the empty string as input", (done) => {
      files.readFiles("", (error, string) => {
        try {
          expect(error).to.be.null;
          expect(string).to.eql("");
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it("should return with an error if one of the files does not exist", (done) => {
      files.readFiles(
        [
          targetDir + "/c.txt",
          targetDir + "/nonexistent.txt",
          targetDir + "/b.txt",
        ],
        null,
        (error, string) => {
          try {
            expect(error).to.not.be.null;
            expect(error).to.not.be.undefined;
            expect(string).to.be.undefined;
            done();
          } catch (err) {
            done(err);
          }
        }
      );
    });
  });

  describe("#stat(path[, options, cb])", () => {
    it("should notify a callback with stats", (callback) => {
      files.stat(__filename, (error, stats) => {
        if (error) return callback(error);
        expect(stats).to.be.an.instanceof(files.Stats);
        callback();
      });
    });
    it("should resolve a Promise with stats", async function () {
      const stats = await files.stat(__filename);
      expect(stats).to.be.an.instanceof(files.Stats);
    });
  });

  describe("#touch(filename, options, cb)", function () {
    before(function (done) {
      waterfall(
        [
          function (cb) {
            cb(null, targetDir);
          },
          files.rmrf,
          function (cb) {
            cb(null, targetDir);
          },
          files.mkdirp,
        ],
        done
      );
    });

    after(function (done) {
      files.rmrf(targetDir, done);
    });

    it("should create an empty file", function (done) {
      const touchFile = targetDir + "/foo.bar";
      expect(function () {
        files.isFileSync(touchFile);
      }).to.throw(/ENOENT.*/);
      waterfall(
        [
          function (cb) {
            cb(null, touchFile, null);
          },
          files.touch,
          function (res, cb) {
            expect(res).to.be.undefined;
            cb(null, touchFile);
          },
          files.isFile.bind(files),
          function (truth, cb) {
            expect(truth).to.be.ok;
            cb(null, touchFile);
          },
          files.rmrf,
          function (cb) {
            cb(null, touchFile);
          },
          files.touch,
          function (res, cb) {
            expect(res).to.be.undefined;
            cb(null, touchFile);
          },
          files.isFile.bind(files),
        ],
        done
      );
    });
    it("should throw TypeError when filename is null", async function () {
      await files
        .touch()
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      await files
        .touch(null)
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
  });

  describe("#writeFile(file, data[, options, callback]", () => {
    it("should write a file and notify a callback", (callback) => {
      const testFile = targetDir + "/writeFileTestCallback.txt";
      files.rmrf(testFile, (error) => {
        if (error) return callback(error);
        files.mkdirp(targetDir, (erro) => {
          if (erro) return callback(erro);
          files.writeFile(testFile, "writeFileTest", "utf8", (err) => {
            if (err) return callback(err);
            files.readFile(testFile, "utf8", (er, string) => {
              if (er) return callback(er);
              expect(string).to.eql("writeFileTest");
              files.rmrf(testFile, callback);
            });
          });
        });
      });
    });
    it("should write a file and resolve a Promise", async function () {
      const testFile = targetDir + "/writeFileTestPromise.txt";
      await files.rmrf(testFile);
      await files.mkdirp(targetDir);
      await files.writeFile(testFile, "writeFileTest", "utf8");
      const string = await files.readFile(testFile, "utf8");
      expect(string).to.eql("writeFileTest");
      await files.rmrf(testFile);
    });
  });
});
