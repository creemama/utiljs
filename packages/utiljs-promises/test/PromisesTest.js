"use strict";

const { expect } = require("chai"),
  promises = require("..");

describe("Promises", function() {
  describe("#call(object, functionOnObjectWithCallback, args)", () => {
    it("should call the callback if args contains a callback", callback => {
      function functionWithCallback(a, b, cb) {
        expect(a).to.eql("a");
        expect(b).to.eql("b");
        cb();
      }
      const returnValue = promises.call(null, functionWithCallback, [
        "a",
        "b",
        callback
      ]);
      try {
        expect(returnValue).to.be.undefined;
      } catch (e) {
        callback(e);
      }
    });
    it("should resolve the returned Promise if args does not contain a callback", () => {
      function functionWithCallback(a, b, cb) {
        expect(a).to.eql("a");
        expect(b).to.eql("b");
        cb();
      }
      return promises.call(null, functionWithCallback, ["a", "b"]);
    });
  });

  describe("#promisify(functionWithCallback)", () => {
    it("should promisify callback functions with one argument", () => {
      function functionWithCallback(callback) {
        callback();
      }
      return promises.promisify(functionWithCallback)();
    });
    it("should promisify callback functions with two arguments", () => {
      function functionWithCallback(a, callback) {
        expect(a).to.eql("a");
        callback();
      }
      return promises.promisify(functionWithCallback)("a");
    });
    it("should promisify callback functions with three arguments", () => {
      function functionWithCallback(a, b, callback) {
        expect(a).to.eql("a");
        expect(b).to.eql("b");
        callback();
      }
      return promises.promisify(functionWithCallback)("a", "b");
    });
  });

  describe("#promisifyAndCall", () => {
    it("should handle functions with only a callback", () => {
      function functionWithCallback(callback) {
        callback();
      }
      return promises.promisifyAndCall(this, functionWithCallback);
    });
    it("should handle functions with multiple arguments", () => {
      function functionWithCallback(x, y, z, callback) {
        expect(x).to.equal(1);
        expect(y).to.equal(2);
        expect(z).to.equal(3);
        callback(null, x + y + z);
      }
      return promises
        .promisifyAndCall(this, functionWithCallback, 1, 2, 3)
        .then(result => {
          expect(result).to.equal(6);
        });
    });
  });
});
