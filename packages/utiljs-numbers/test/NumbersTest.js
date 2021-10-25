"use strict";

const { expect } = require("chai");
const numbers = require("..");

describe("Numbers#abs(x)", () => {
  it("should calculate correctly", () => {
    expect(numbers.abs(numbers.NEGATIVE_INFINITY)).to.eql(
      numbers.POSITIVE_INFINITY
    );
  });
});

describe("Numbers#cos(x)", () => {
  it("should calculate correctly", () => {
    expect(numbers.cos(numbers.PI)).to.eql(-1);
  });
});

describe("Numbers", () => {
  describe("#ascendingComparator", () => {
    it("should order arrays of numbers in ascending order", () => {
      const expected = [
        numbers.NEGATIVE_INFINITY,
        -33,
        0,
        33.33,
        numbers.POSITIVE_INFINITY,
        numbers.NaN,
        numbers.NaN,
      ];
      const actual = [
        numbers.POSITIVE_INFINITY,
        0,
        numbers.NaN,
        numbers.NEGATIVE_INFINITY,
        -33,
        numbers.NaN,
        33.33,
      ].sort(numbers.ascendingComparator());
      expect(actual).to.deep.equal(expected);
    });
  });

  describe("#descendingComparator", () => {
    it("should order arrays of numbers in descending order", () => {
      const expected = [
        numbers.NaN,
        numbers.NaN,
        numbers.NaN,
        numbers.POSITIVE_INFINITY,
        33.33,
        0,
        -33,
        numbers.NEGATIVE_INFINITY,
      ];
      const actual = [
        numbers.NaN,
        numbers.POSITIVE_INFINITY,
        0,
        numbers.NaN,
        numbers.NEGATIVE_INFINITY,
        -33,
        numbers.NaN,
        33.33,
      ].sort(numbers.descendingComparator());
      expect(actual).to.deep.equal(expected);
    });
  });

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
      expect(numbers.isInt([5, 6])).to.be.true;
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
