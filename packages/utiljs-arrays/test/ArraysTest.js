"use strict";

const arrays = require("..");
const { expect } = require("chai");

describe("Arrays", () => {
  describe("#from", () => {
    it("should create a shallow copy", () => {
      const a = [1, 2, 3];
      const b = arrays.from(a);
      expect(b == a).to.be.false;
      expect(b[0]).to.eql(1);
      expect(b[1]).to.eql(2);
      expect(b[2]).to.eql(3);
      expect(b.length).to.eql(3);
    });
    it("should throw an error an undefined or null input", () => {
      expect(() => arrays.from()).to.throw(Error);
      expect(() => arrays.from(null)).to.throw(Error);
    });
  });

  describe("#sort", () => {
    it("should sort an array", () => {
      const a = [2, 1, 3];
      const b = arrays.sort(a);
      expect(b).to.not.eql(a);
      expect(b).to.eql([1, 2, 3]);
    });
  });

  describe("#shuffle", () => {
    it("should shuffle array contents", () => {
      const a = [1, 2, 3];
      const b = arrays.shuffle(a);
      expect(b == a).to.be.false;
      expect(b.length).to.eql(3);
      // console.log(b)
    });
    it("should throw an error an undefined or null input", () => {
      expect(() => arrays.shuffle()).to.throw(Error);
      expect(() => arrays.shuffle(null)).to.throw(Error);
    });
  });
});
