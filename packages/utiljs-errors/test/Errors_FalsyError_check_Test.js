"use strict";

const { expect } = require("chai");
const { FalsyError } = require("..");

describe("FalsyError#check", () => {
  it('should throw a FalsyError given a falsy argument value: (NaN, "argument", "Lawyer#argue").', () => {
    try {
      FalsyError.check(NaN, "argument", "Lawyer#argue");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(FalsyError);
      expect(e.message).to.equal(
        "Lawyer#argue expected `argument` to be truthy. `argument` is the falsy value NaN."
      );
      expect(e.argumentName).to.equal("argument");
    }
  });

  it('should throw a FalsyError given a falsy argument value: (false, "argument").', () => {
    try {
      FalsyError.check(false, "argument");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(FalsyError);
      expect(e.message).to.equal(
        "We expected `argument` to be truthy. `argument` is the falsy value false."
      );
      expect(e.argumentName).to.equal("argument");
    }
  });

  it('should throw a FalsyError given a falsy argument value: (undefined, null, "Lawyer#argue").', () => {
    try {
      FalsyError.check(undefined, null, "Lawyer#argue");
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(FalsyError);
      expect(e.message).to.equal(
        "Lawyer#argue expected an argument to be truthy. It is the falsy value undefined."
      );
      expect(e.argumentName).to.be.null;
    }
  });

  it("should throw a FalsyError given a falsy argument value: (null).", () => {
    try {
      FalsyError.check(null);
      throw new Error("The method did not throw an error.");
    } catch (e) {
      expect(e).to.be.an.instanceof(FalsyError);
      expect(e.message).to.equal(
        "We expected an argument to be truthy. It is the falsy value null."
      );
      expect(e.argumentName).to.be.undefined;
    }
  });

  it('should do nothing given a truthy argument value: ("truthyValue", "truthy", "Fountain#spitTruth").', () => {
    FalsyError.check("truthyValue", "truthy", "Fountain#spitTruth");
  });

  it('should do nothing given a truthy argument value: ("truthyValue", "truthy").', () => {
    FalsyError.check("truthyValue", "truthy");
  });

  it('should do nothing given a truthy argument value: ("truthyValue", null, "Fountain#spitTruth").', () => {
    FalsyError.check("truthyValue", null, "Fountain#spitTruth");
  });

  it('should do nothing given a truthy argument value: ("truthyValue").', () => {
    FalsyError.check("truthyValue");
  });
});
