"use strict";

const { expect } = require("chai"),
  objects = require("..");

describe("Objects", () => {
  describe("#assign(target, ...sources)", () => {
    it("should copy values from a source to a target", () => {
      const source = { a: "foo", b: "bar" };
      const target = objects.assign({}, source);
      expect(target).to.eql({ a: "foo", b: "bar" });
    });
  });

  describe("#isDefined(obj)", () => {
    it("should return true for truthy statements", () => {
      expect(objects.isDefined("truthy")).to.be.true;
      expect(objects.isDefined(Object)).to.be.true;
      expect(objects.isDefined(Object.assign)).to.be.true;
      expect(objects.isDefined([])).to.be.true;
    });
    it('should return true for falsey statements 0, -0, NaN, false, and the empty string ("")', () => {
      expect(objects.isDefined(0)).to.be.true;
      expect(objects.isDefined(-0)).to.be.true;
      expect(objects.isDefined(NaN)).to.be.true;
      expect(objects.isDefined(false)).to.be.true;
      expect(objects.isDefined("")).to.be.true;
    });
    it("should return false for falsey statements null and undefined", () => {
      expect(objects.isDefined(null)).to.be.false;
      expect(objects.isDefined()).to.be.false;
      let a;
      expect(objects.isDefined(a)).to.be.false;
    });
  });

  describe("#merge(a, b)", () => {
    it("should handle nulls and undefined inputs", () => {
      // If u = undefined, n = null, and o = object,
      // we're going to test:

      // u, u
      // u, n // not testing
      // u, o // not testing
      // n, u
      // n, n
      // n, o
      // o, u
      // o, n
      // o, o

      expect(objects.merge()).to.eql({});
      expect(objects.merge(null)).to.eql({});
      expect(objects.merge(null, null)).to.eql({});
      expect(objects.merge(null, { a: "a" })).to.eql({ a: "a" });
      expect(objects.merge({ a: "a" })).to.eql({ a: "a" });
      expect(objects.merge({ a: "a" }, null)).to.eql({ a: "a" });
      expect(objects.merge({ a: "a" }, { b: "b" })).to.eql({ b: "b", a: "a" });
    });
    it("should return b's properties over a's", () => {
      expect(objects.merge({ a: "a" }, { a: "a" })).to.eql({ a: "a" });
      expect(objects.merge({ a: "a" }, { a: "b" })).to.eql({ a: "b" });
    });
  });
});
