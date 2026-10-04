"use strict";

const { expect } = require("chai");
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
    expect(await files.exists(targetDir)).to.be.true;
  });

  it("should return false for a nonexistent file via a callback", (done) => {
    files.exists(targetDir + "-nonexistent", (exists) => {
      expect(exists).to.be.false;
      done();
    });
  });

  it("should return false for an nonexistent file via a Promise", async () => {
    expect(await files.exists(targetDir + "-nonexistent")).to.be.false;
  });
});
