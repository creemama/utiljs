"use strict";

const { expect } = require("chai");
const { MissingError } = require("..");

describe("MissingError#check", () => {
  it('should throw a MissingError given a \'null\' argument value: (null, "argument", "Lawyer#argue").', () => {
    try {
      MissingError.check(null, "argument", "Lawyer#argue");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.equal("argument");
    }
  });

  it("should throw a MissingError given a 'null' argument value: (null, \"argument\").", () => {
    try {
      MissingError.check(null, "argument");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.equal("argument");
    }
  });

  it("should throw a MissingError given a 'null' argument value: (null, null, \"Lawyer#argue\").", () => {
    try {
      MissingError.check(null, null, "Lawyer#argue");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.be.null;
    }
  });

  it("should throw a MissingError given a 'null' argument value: (null).", () => {
    try {
      MissingError.check(null);
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.be.undefined;
    }
  });

  it('should throw a MissingError given an \'undefined\' argument value: (undefined, "argument", "Lawyer#argue").', () => {
    try {
      MissingError.check(undefined, "argument", "Lawyer#argue");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.equal("argument");
    }
  });

  it("should throw a MissingError given an 'undefined' argument value: (undefined, \"argument\").", () => {
    try {
      MissingError.check(undefined, "argument");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.equal("argument");
    }
  });

  it("should throw a MissingError given an 'undefined' argument value: (undefined, null, \"Lawyer#argue\").", () => {
    try {
      MissingError.check(undefined, null, "Lawyer#argue");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.be.null;
    }
  });

  it("should throw a MissingError given an 'undefined' argument value: no arguments.", () => {
    try {
      MissingError.check(undefined);
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(MissingError);
      expect(e.argumentName).to.be.undefined;
    }
  });

  it('should do nothing given a defined argument value: (0, "zero", "Zero#returnZero").', () => {
    MissingError.check(0, "zero", "Zero#returnZero");
  });

  it('should do nothing given a defined argument value: (0, "zero").', () => {
    MissingError.check(0, "zero");
  });

  it('should do nothing given a defined argument value: (0, null, "Zero#returnZero").', () => {
    MissingError.check(0, null, "Zero#returnZero");
  });

  it("should do nothing given a defined argument value: (0).", () => {
    MissingError.check(0);
  });
});
