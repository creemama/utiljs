"use strict";

const { expect } = require("chai"),
  promises = require("..");

describe("Promises", function() {
  describe("#all(iterable)", () => {
    it("should properly handle a single, iterable argument", () => {
      const promise1 = Promise.resolve(3);
      const promise2 = 42;
      const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });
      return promises.all([promise1, promise2, promise3]).then(values => {
        expect(values).to.eql([3, 42, "foo"]);
      });
    });
    it("should properly handle a single, iterable argument", () => {
      const promise1 = Promise.resolve(3);
      const promise2 = 42;
      const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });
      return promises.all(promise1, promise2, promise3).then(values => {
        expect(values).to.eql([3, 42, "foo"]);
      });
    });
  });

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
    it("should throw an Error if functionWithCallback or args is null or undefined", () => {
      function functionWithCallback(cb) {
        cb();
      }
      expect(() => promises.call(null, functionWithCallback)).to.throw(
        TypeError
      );
      expect(() => promises.call(null, functionWithCallback, null)).to.throw(
        TypeError
      );
      // The following line sends functionWithCallback the wrong number of arguments.
      const a = promises
        .call(null, functionWithCallback, "a")
        .then(() => expect.fail("We expected call to throw an error."))
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
      expect(() => promises.call(null, null, [() => {}])).to.throw(TypeError);
      expect(() => promises.call(null, "a", [() => {}])).to.throw(TypeError);
      expect(() => promises.call(null, null, [])).to.throw(TypeError);
      expect(() => promises.call(null, "a", [])).to.throw(TypeError);
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
    it("should reject if functionWithCallback is not a function", () => {
      expect(() => promises.promisify()).to.throw(TypeError);
      expect(() => promises.promisify(null)).to.throw(TypeError);
      expect(() => promises.promisify("random")).to.throw(TypeError);
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
    it("should throw an Error if functionWithCallback or args is null or undefined", () => {
      function functionWithCallback(cb) {
        cb();
      }
      // The following line sends functionWithCallback the wrong number of arguments.
      const a = promises
        .promisifyAndCall(null, functionWithCallback, "a")
        .then(() => expect.fail("We expected call to throw an error."))
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
      expect(() => promises.promisifyAndCall(null, null)).to.throw(TypeError);
      expect(() => promises.promisifyAndCall(null, "a")).to.throw(TypeError);
      return a;
    });
  });

  describe("#race(iterable)", () => {
    it("should handle a single, iterable argument", () => {
      const promise1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, "one");
      });
      const promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "two");
      });
      return promises.race([promise1, promise2]).then(value => {
        expect(value).to.eql("two");
      });
    });
    it("should handle multiple arguments", () => {
      const promise1 = new Promise((resolve, reject) => {
        setTimeout(resolve, 500, "one");
      });
      const promise2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "two");
      });
      return promises.race(promise1, promise2).then(value => {
        expect(value).to.eql("two");
      });
    });
  });
});
