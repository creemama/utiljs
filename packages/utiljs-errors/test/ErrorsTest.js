"use strict";

const { AssertionError, expect } = require("chai"),
  errors = require(".."),
  { RethrownError } = errors;

describe("new Errors#RethrownError(message, error)", () => {
  it("should create a rethrown error with an appropriate stack trace", () => {
    function throwATypeError() {
      throw new TypeError("Invalid Argument");
    }
    function rethrowTheTypeError() {
      try {
        throwATypeError();
      } catch (error) {
        expect(new RethrownError(error).stack).to.include(
          "RethrownError: Invalid Argument\n"
        );
        expect(new RethrownError(error, "").stack).to.include(
          "RethrownError: Invalid Argument\n"
        );
        throw new RethrownError(error, "Lorem Ipsum");
      }
    }
    try {
      rethrowTheTypeError();
      expect.fail("We expected the runtime to throw a RethrownError.");
    } catch (error) {
      if (error instanceof AssertionError) throw error;
      expect(error).to.be.an.instanceof(RethrownError);
      expect(error.original).to.be.an.instanceof(TypeError);
      expect(error.stack).to.include("RethrownError: Lorem Ipsum");
      expect(error.stack).to.include("at rethrowTheTypeError");
      expect(error.stack).to.include("TypeError: Invalid Argument");
      expect(error.stack).to.include("at throwATypeError");
    }
  });
  it("should throw an error when given an invalid error", () => {
    expect(() => new RethrownError()).to.throw(TypeError);
    expect(() => new RethrownError(null, "Lorem Ipsum")).to.throw(TypeError);
  });
});
