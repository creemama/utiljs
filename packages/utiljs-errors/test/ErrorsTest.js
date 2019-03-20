"use strict";

const { AssertionError, expect } = require("chai"),
  errors = require(".."),
  { AsyncError, RethrownError } = errors;

describe("Errors#catch(promise)", () => {
  it("should return a Promise that throws an AsyncError upon rejection", () => {
    function rejectAPromise() {
      return Promise.reject(new TypeError("Fail!"));
    }
    return errors.catch(rejectAPromise()).catch(error => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql("Fail!");
      expect(error.stack).to.include("AsyncError: Fail!");
      expect(error.stack).to.include("at rejectAPromise");
      expect(error.stack).to.include("TypeError: Fail!");
    });
  });
  it("should take the optional message argument", () => {
    function rejectAPromise() {
      return Promise.reject(new TypeError("Fail!"));
    }
    return errors.catch(rejectAPromise(), "optional message").catch(error => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql("optional message");
      expect(error.stack).to.include("AsyncError: optional message");
      expect(error.stack).to.include("at rejectAPromise");
      expect(error.stack).to.include("TypeError: Fail!");
    });
  });
  it("should throw a TypeError if the given promise is not defined", () => {
    expect(() => errors.catch()).to.throw(TypeError);
  });
});

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
