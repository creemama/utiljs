"use strict";

const expect = require("chai").expect,
  promises = require(__dirname + "/..");

describe("Promises", function() {
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
