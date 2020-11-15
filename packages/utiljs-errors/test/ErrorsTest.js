"use strict";

const { AssertionError, expect } = require("chai"),
  errors = require(".."),
  { AsyncError, RethrownError } = errors;

describe("Errors#catch(promise)", () => {
  it("should return a Promise that throws an AsyncError upon rejection", () => {
    function rejectAPromise() {
      return Promise.reject(new TypeError("Fail!"));
    }
    return errors.catch(rejectAPromise()).catch((error) => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql("Fail!");
      expect(error.original).to.be.an.instanceof(TypeError);
      expect(error.stack).to.include("AsyncError: Fail!");
      expect(error.stack).to.include("at rejectAPromise");
      expect(error.stack).to.include("TypeError: Fail!");
    });
  });
  it("should take the optional message argument", () => {
    function rejectAPromise() {
      return Promise.reject(new TypeError("Fail!"));
    }
    return errors.catch(rejectAPromise(), "optional message").catch((error) => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql("optional message");
      expect(error.original).to.be.an.instanceof(TypeError);
      expect(error.stack).to.include("AsyncError: optional message");
      expect(error.stack).to.include("at rejectAPromise");
      expect(error.stack).to.include("TypeError: Fail!");
    });
  });
  it("should return a Promise that throws an AsyncError upon rejecting with a string", () => {
    function rejectAPromise() {
      return Promise.reject("ENTITY_NOT_FOUND");
    }
    return errors.catch(rejectAPromise()).catch((error) => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql('"ENTITY_NOT_FOUND"');
      expect(error.original).to.eql("ENTITY_NOT_FOUND");
      expect(error.stack).to.include("AsyncError");
      expect(error.stack).to.include("ENTITY_NOT_FOUND");
    });
  });
  it("should return a Promise that throws an AsyncError upon rejecting with an array", () => {
    function rejectAPromise() {
      return Promise.reject([{ code: "1234" }]);
    }
    return errors.catch(rejectAPromise()).catch((error) => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql('[{"code":"1234"}]');
      expect(error.original).to.eql([{ code: "1234" }]);
      expect(error.stack).to.include("AsyncError");
      expect(error.stack).to.include('[{"code":"1234"}]');
    });
  });
  it("should return a Promise that throws an AsyncError upon rejecting with a circularly referenced object", () => {
    const obj = {};
    obj.circular = obj;
    return errors.catch(Promise.reject(obj)).catch((error) => {
      expect(error).to.be.an.instanceof(AsyncError);
      expect(error.message).to.eql("[object Object]");
      expect(error.original).to.eql(obj);
      expect(error.stack).to.include("AsyncError");
      expect(error.stack).to.include("[object Object]");
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
          "RethrownError\n"
        );
        throw new RethrownError(error, "Lorem Ipsum");
      }
    }
    try {
      rethrowTheTypeError();
      expect.fail("We expected the runtime to throw a RethrownError.");
    } catch (error) {
      if (!(error instanceof RethrownError)) throw error;
      expect(error.message).to.eql("Lorem Ipsum");
      expect(error.original).to.be.an.instanceof(TypeError);
      expect(error.stack).to.include("RethrownError: Lorem Ipsum");
      expect(error.stack).to.include("at rethrowTheTypeError");
      expect(error.stack).to.include("TypeError: Invalid Argument");
      expect(error.stack).to.include("at throwATypeError");
    }
  });
  it("should create a rethrown error from a thrown string", () => {
    function throwAString() {
      throw "ENTITY_NOT_FOUND";
    }
    function rethrowTheString() {
      try {
        throwAString();
      } catch (error) {
        expect(new RethrownError(error).stack).to.include(
          'RethrownError: "ENTITY_NOT_FOUND"\n'
        );
        expect(new RethrownError(error).stack.endsWith('"ENTITY_NOT_FOUND"')).to
          .be.true;
        expect(new RethrownError(error, "").stack).to.include(
          "RethrownError\n"
        );
        expect(new RethrownError(error, 0).stack).to.include(
          "RethrownError: 0\n"
        );
        expect(new RethrownError(error, "").stack).to.include(
          "ENTITY_NOT_FOUND"
        );
        throw new RethrownError(error, "Lorem Ipsum");
      }
    }
    try {
      rethrowTheString();
      expect.fail("We expected the runtime to throw a RethrownError.");
    } catch (error) {
      if (!(error instanceof RethrownError)) throw error;
      expect(error.message).to.eql("Lorem Ipsum");
      expect(error.original).to.eql("ENTITY_NOT_FOUND");
      expect(error.stack).to.include("RethrownError");
      expect(error.stack).to.include("at rethrowTheString");
      expect(error.stack).to.include("ENTITY_NOT_FOUND");
    }
  });
  it("should create a rethrown error from a thrown array", () => {
    function throwAnArray() {
      throw [{ code: "1234" }];
    }
    function rethrowTheArray() {
      try {
        throwAnArray();
      } catch (error) {
        expect(new RethrownError(error).stack).to.include(
          'RethrownError: [{"code":"1234"}]\n'
        );
        expect(new RethrownError(error).stack.endsWith('[{"code":"1234"}]')).to
          .be.true;
        expect(new RethrownError(error, "").stack).to.include(
          "RethrownError\n"
        );
        expect(new RethrownError(error, "").stack).to.include(
          '[{"code":"1234"}]'
        );
        throw new RethrownError(error, "Lorem Ipsum");
      }
    }
    try {
      rethrowTheArray();
      expect.fail("We expected the runtime to throw a RethrownError.");
    } catch (error) {
      if (!(error instanceof RethrownError)) throw error;
      expect(error.message).to.eql("Lorem Ipsum");
      expect(error.original).to.eql([{ code: "1234" }]);
      expect(error.stack).to.include("RethrownError");
      expect(error.stack).to.include("at rethrowTheArray");
      expect(error.stack).to.include('[{"code":"1234"}]');
    }
  });
  it("should create a rethrown error from a circularly referenced object", () => {
    const obj = {};
    obj.circular = obj;
    const error = new RethrownError(obj);
    expect(error.stack).to.include("RethrownError: [object Object]\n");
    expect(error.stack).to.include("[object Object]");
  });
  it("should throw an error when given an invalid error", () => {
    expect(() => new RethrownError()).to.throw(TypeError);
    expect(() => new RethrownError(null, "Lorem Ipsum")).to.throw(TypeError);
  });
});
