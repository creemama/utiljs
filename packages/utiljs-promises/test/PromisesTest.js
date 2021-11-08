"use strict";

const { expect } = require("chai");
const promises = require("..");

describe("Promises", function () {
  describe("#(apply|call)Callback(object, functionOnObjectWithCallback, args)", () => {
    function notify(message, who, callback) {
      if (message === "Throw error") throw new Error("Hypnotoad died.");
      if (message === "Return undefined") return;
      callback(null, `${message}, ${who}!`);
    }
    it("should resolve a Promise", async function () {
      expect(
        await promises.applyCallback(null, notify, ["Promise me", "Hypnotoad"])
      ).to.eql("Promise me, Hypnotoad!");
      expect(
        await promises.callCallback(null, notify, "Promise me", "Hypnotoad")
      ).to.eql("Promise me, Hypnotoad!");
    });
    it("should error if functionOnObjectWithCallback is not a function", () => {
      expect(() =>
        promises.applyCallback(null, null, ["Promise me", "Hypnotoad"])
      ).to.throw(TypeError);
      expect(() =>
        promises.callCallback(null, null, "Promise me", "Hypnotoad")
      ).to.throw(TypeError);
      expect(() =>
        promises.applyCallback(null, "a", ["Promise me", "Hypnotoad"])
      ).to.throw(TypeError);
      expect(() =>
        promises.callCallback(null, "a", "Promise me", "Hypnotoad")
      ).to.throw(TypeError);
    });
    it("should error if args is erroneous", () => {
      // This does not cause failures in the unit test, but there is output.
      promises
        .callCallback(null, notify, "Return undefined")
        .then((message) => {
          throw new Error("Expected expected the function to never return.");
        })
        .catch((error) => {
          throw error;
        });
      expect(() => promises.applyCallback(null, notify)).to.throw(TypeError);
      const a = promises
        .callCallback(null, notify)
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      const b = promises
        .applyCallback(null, notify, ["Hypnotoad"])
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      const c = promises
        .callCallback(null, notify, "Hypnotoad")
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      const d = promises
        .applyCallback(null, notify, ["Throw error"])
        .catch((error) => expect(error).to.be.an.instanceof(Error));
      const e = promises
        .callCallback(null, notify, "Throw error")
        .catch((error) => expect(error).to.be.an.instanceof(Error));
      return promises.all(a, b, c, d, e);
    });
  });

  describe("#(apply|call)Promise(object, promiseFunctionOnObject, args)", () => {
    function notify(message, who) {
      if (message === "Throw error") throw new Error("Hypnotoad died.");
      if (message === "Return undefined") return;
      return promises.resolve(`${message}, ${who}!`);
    }
    it("should notify a callback", (callback) => {
      a(callback);
      function a(callbck) {
        promises.applyPromise(null, notify, [
          "Call back",
          "Hypnotoad",
          (error, message) => {
            if (error) {
              callbck(error);
              return;
            }
            expect(message).to.eql("Call back, Hypnotoad!");
            b(callbck);
          },
        ]);
      }
      function b(callbck) {
        promises.callPromise(
          null,
          notify,
          "Call back",
          "Hypnotoad",
          (error, message) => {
            if (error) {
              callbck(error);
              return;
            }
            expect(message).to.eql("Call back, Hypnotoad!");
            c(callbck);
          }
        );
      }
      function c(callbck) {
        function adapt(message, who, callback) {
          if (callback) return promises.applyPromise(null, notify, arguments);
          return promises.resolve(`${message}, ${who}!`);
        }
        promises.callPromise(
          null,
          adapt,
          "Call back",
          "Hypnotoad",
          (error, value) => {
            if (error) {
              callbck(error);
              return;
            }
            try {
              expect(value).to.eql("Call back, Hypnotoad!");
              callbck();
            } catch (err) {
              callbck(err);
            }
          }
        );
      }
    });
    it("should error if promiseFunction is not a function", () => {
      expect(() =>
        promises.applyPromise(null, null, ["Call back", "Hypnotoad"])
      ).to.throw(TypeError);
      expect(() =>
        promises.callPromise(null, null, "Call back", "Hypnotoad")
      ).to.throw(TypeError);
      expect(() =>
        promises.applyPromise(null, "a", ["Call back", "Hypnotoad"])
      ).to.throw(TypeError);
      expect(() =>
        promises.callPromise(null, "a", "Call back", "Hypnotoad")
      ).to.throw(TypeError);
    });
    it("should handle erroneous input", (callback) => {
      a(callback);
      function a(callbck) {
        try {
          expect(() => promises.applyPromise(null, notify)).to.throw(TypeError);
          b(callbck);
        } catch (error) {
          callbck(error);
        }
      }
      function b(callbck) {
        promises
          .callPromise(null, notify)
          .then((message) => {
            expect(message).to.eql("undefined, undefined!");
            c(callbck);
          })
          .catch(callbck);
      }
      function c(callbck) {
        promises.applyPromise(null, notify, [
          "Call back",
          (error, value) => {
            try {
              expect(error).to.be.null;
              expect(value).to.eql("Call back, undefined!");
              d(callbck);
            } catch (err) {
              callbck(err);
            }
          },
        ]);
      }
      function d(callbck) {
        promises.callPromise(null, notify, "Call back", (error, value) => {
          try {
            expect(error).to.be.null;
            expect(value).to.eql("Call back, undefined!");
            e(callbck);
          } catch (err) {
            callbck(err);
          }
        });
      }
      function e(callbck) {
        promises.applyPromise(null, notify, [
          "Throw error",
          (error, value) => {
            try {
              expect(error).to.be.an.instanceof(Error);
              expect(value).to.be.undefined;
              f(callbck);
            } catch (err) {
              callbck(err);
            }
          },
        ]);
      }
      function f(callbck) {
        promises.callPromise(null, notify, "Throw error", (error, value) => {
          try {
            expect(error).to.be.an.instanceof(Error);
            expect(value).to.be.undefined;
            g(callbck);
          } catch (err) {
            callbck(err);
          }
        });
      }
      function g(callbck) {
        try {
          expect(() =>
            promises.callPromise(
              null,
              notify,
              "Return undefined",
              (error, value) => {
                callback(
                  new Error(
                    "We expected #callPromise to not call this callback.",
                    { cause: error }
                  )
                );
              }
            )
          ).to.throw(Error);
          callbck();
        } catch (error) {
          callbck(error);
        }
      }
    });
  });

  describe("#all(iterable)", () => {
    it("should properly handle a single, iterable argument", () => {
      const promise1 = Promise.resolve(3);
      const promise2 = 42;
      const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });
      return promises.all([promise1, promise2, promise3]).then((values) => {
        expect(values).to.eql([3, 42, "foo"]);
      });
    });
    it("should properly handle a single, iterable argument", () => {
      const promise1 = Promise.resolve(3);
      const promise2 = 42;
      const promise3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, "foo");
      });
      return promises.all(promise1, promise2, promise3).then((values) => {
        expect(values).to.eql([3, 42, "foo"]);
      });
    });
    it("should reject when given no arguments", () => {
      return promises
        .all()
        .then(() => expect.fail("We expected promises#all to fail."))
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
    });
    it("should resolve with [] when given [] as an argument", () => {
      return promises.all([]).then((values) => {
        expect(values).to.eql([]);
      });
    });
  });

  describe("#applyCallback(object, functionOnObjectWithCallback, args)", () => {
    it("should call the callback if args contains a callback", (callback) => {
      function functionWithCallback(a, b, cb) {
        expect(a).to.eql("a");
        expect(b).to.eql("b");
        cb();
      }
      const returnValue = promises.applyCallback(null, functionWithCallback, [
        "a",
        "b",
        callback,
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
      return promises.applyCallback(null, functionWithCallback, ["a", "b"]);
    });
    it("should throw an Error if functionWithCallback or args is null or undefined", () => {
      function functionWithCallback(cb) {
        cb();
      }
      expect(() => promises.applyCallback(null, functionWithCallback)).to.throw(
        TypeError
      );
      expect(() =>
        promises.applyCallback(null, functionWithCallback, null)
      ).to.throw(TypeError);
      // The following line sends functionWithCallback the wrong number of arguments.
      expect(() =>
        promises.applyCallback(null, functionWithCallback, "a")
      ).to.throw(TypeError);
      expect(() => promises.applyCallback(null, null, [() => {}])).to.throw(
        TypeError
      );
      expect(() => promises.applyCallback(null, "a", [() => {}])).to.throw(
        TypeError
      );
      expect(() => promises.applyCallback(null, null, [])).to.throw(TypeError);
      expect(() => promises.applyCallback(null, "a", [])).to.throw(TypeError);
    });
  });

  describe("#callbackify(promiseFunction)", () => {
    it("should callbackify Promise functions with no arguments", (callback) => {
      function promiseFunction() {
        return Promise.resolve("foobar");
      }
      promises.callbackify(promiseFunction)((error, value) => {
        try {
          expect(error).to.be.null;
          expect(value).to.eql("foobar");
          callback();
        } catch (err) {
          callback(err);
        }
      });
    });
    it("should callbackify Promise functions with one arguments", (callback) => {
      function promiseFunction(message) {
        return Promise.resolve(message);
      }
      promises.callbackify(promiseFunction)("foobar", (error, value) => {
        try {
          expect(error).to.be.null;
          expect(value).to.eql("foobar");
          callback();
        } catch (err) {
          callback(err);
        }
      });
    });
    it("should callbackify Promise functions with two arguments", (callback) => {
      function promiseFunction(a, b) {
        return Promise.resolve(a + b);
      }
      promises.callbackify(promiseFunction)("foo", "bar", (error, value) => {
        try {
          expect(error).to.be.null;
          expect(value).to.eql("foobar");
          callback();
        } catch (err) {
          callback(err);
        }
      });
    });
    it("should cache callbackified functions", () => {
      function promiseFunction(a, b) {
        return Promise.resolve(a + b);
      }
      const a = promises.callbackify(promiseFunction);
      const b = promises.callbackify(promiseFunction);
      expect(a === b).to.be.ok;
    });
    it("should throw an error if promiseFunction is not a function", () => {
      expect(() => promises.callbackify()).to.throw(TypeError);
      expect(() => promises.callbackify(null)).to.throw(TypeError);
      expect(() => promises.callbackify("a")).to.throw(TypeError);
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
    it("should cache promisified functions", () => {
      function functionWithCallback(a, b, callback) {
        expect(a).to.eql("a");
        expect(b).to.eql("b");
        callback();
      }
      const a = promises.promisify(functionWithCallback);
      const b = promises.promisify(functionWithCallback);
      expect(a === b).to.be.ok;
    });
    it("should reject if functionWithCallback is not a function", () => {
      expect(() => promises.promisify()).to.throw(TypeError);
      expect(() => promises.promisify(null)).to.throw(TypeError);
      expect(() => promises.promisify("random")).to.throw(TypeError);
    });
  });

  describe("#callCallback", () => {
    it("should handle functions with only a callback", () => {
      function functionWithCallback(callback) {
        callback();
      }
      return promises.callCallback(this, functionWithCallback);
    });
    it("should handle functions with multiple arguments", () => {
      function functionWithCallback(x, y, z, callback) {
        expect(x).to.equal(1);
        expect(y).to.equal(2);
        expect(z).to.equal(3);
        callback(null, x + y + z);
      }
      return promises
        .callCallback(this, functionWithCallback, 1, 2, 3)
        .then((result) => {
          expect(result).to.equal(6);
        });
    });
    it("should throw an Error if functionWithCallback or args is null or undefined", () => {
      function functionWithCallback(cb) {
        cb();
      }
      // The following line sends functionWithCallback the wrong number of arguments.
      const a = promises
        .callCallback(null, functionWithCallback, "a")
        .then(() => expect.fail("We expected call to throw an error."))
        .catch((error) => expect(error).to.be.an.instanceof(TypeError));
      expect(() => promises.callCallback(null, null)).to.throw(TypeError);
      expect(() => promises.callCallback(null, "a")).to.throw(TypeError);
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
      return promises.race([promise1, promise2]).then((value) => {
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
      return promises.race(promise1, promise2).then((value) => {
        expect(value).to.eql("two");
      });
    });
  });
});
