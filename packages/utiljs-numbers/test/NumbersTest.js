"use strict";

const { expect } = require("chai"),
  numbers = require("..");

describe("Numbers", () => {
  describe("#isInt(value)", () => {
    it("should return true for integers", () => {
      expect(numbers.isInt(-33)).to.be.true;
      expect(numbers.isInt(0)).to.be.true;
      expect(numbers.isInt(5)).to.be.true;
    });
    it("should return true for integers as strings", () => {
      expect(numbers.isInt("-33")).to.be.true;
      expect(numbers.isInt("0")).to.be.true;
      expect(numbers.isInt("5")).to.be.true;
    });
    it("should return true for objects whose #toString evaluates to an integer", () => {
      expect(numbers.isInt([5])).to.be.true;
      expect(numbers.isInt({ toString: () => "5" })).to.be.true;
    });
    it("should return false for numbers with a nonzero fractional part", () => {
      expect(numbers.isInt(-33.3)).to.be.false;
      expect(numbers.isInt(0.1)).to.be.false;
      expect(numbers.isInt(1e-5)).to.be.false;
    });
    it("should return false for numbers (as strings) with a nonzero fractional part", () => {
      expect(numbers.isInt("")).to.be.false;
      expect(numbers.isInt("-33.3")).to.be.false;
      expect(numbers.isInt("0.1")).to.be.false;
      expect(numbers.isInt("1e-5")).to.be.false;
    });
    it("should return false for objects whose #toString does not evaluate to an integer", () => {
      expect(numbers.isInt([])).to.be.false;
      expect(numbers.isInt({})).to.be.false;
      expect(numbers.isInt([5, 5])).to.be.false;
      expect(numbers.isInt([5.5, 5])).to.be.false;
      expect(numbers.isInt({ toString: () => "5.5" })).to.be.false;
    });
    it("should return false for undefined, null, NaN, or infinite input", () => {
      expect(numbers.isInt()).to.be.false;
      expect(numbers.isInt(null)).to.be.false;
      expect(numbers.isInt(NaN)).to.be.false;
      expect(numbers.isInt(Infinity)).to.be.false;
      expect(numbers.isInt(Number.NEGATIVE_INFINITY)).to.be.false;
    });
  });
});
