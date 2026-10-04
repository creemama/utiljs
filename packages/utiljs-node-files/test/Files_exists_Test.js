"use strict";

const { assert, expect } = require("chai");
const files = require("..");

describe("Files#exists", () => {
  const targetDir = files.join(__dirname, "..", "target");
  files.mkdirpSync(targetDir);

  it("should return true for an existing file via a callback", (done) => {
    files.exists(targetDir, (exists) => {
      expect(exists).to.be.true;
      done();
    });
  });

  it("should return true for an existing file via a Promise", async () => {
    try {
      expect(await files.exists(targetDir)).to.be.true;
      assert.fail("We expected #exists to throw an error.");
    } catch (e) {
      // FIXME Files#exists should not throw an error.
      expect(e).to.be.true;
    }
  });

  it("should return false for a nonexistent file via a callback", (done) => {
    files.exists(targetDir + "-nonexistent", (exists) => {
      expect(exists).to.be.false;
      done();
    });
  });

  it("should return false for a nonexistent file via a Promise", async () => {
    // FIXME Files#exists should return false.
    expect(await files.exists(targetDir + "-nonexistent")).to.be.undefined;
  });
});
