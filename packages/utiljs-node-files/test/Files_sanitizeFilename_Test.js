"use strict";

const { expect } = require("chai");
const files = require("..");

describe("Files#sanitizeFilename", () => {
  it("should sanitize filenames", () => {
    const expected = "~.sshauthorized_keys";
    const actual = files.sanitizeFilename("~/.\u0000ssh/authorized_keys");
    expect(actual).to.eql(expected);
  });
  it("should sanitize filenames with a replacement", () => {
    const expected = "~_._ssh_authorized_keys";
    const actual = files.sanitizeFilename("~/.\u0000ssh/authorized_keys", {
      replacement: "_",
    });
    expect(actual).to.eql(expected);
  });
  it("should throw an error if the filename is not a string", () => {
    expect(() =>
      files.sanitizeFilename(["~/.\u0000ssh/authorized_keys"])
    ).to.throw(Error);
  });
});
