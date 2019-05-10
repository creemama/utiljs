"use strict";

const { expect } = require("chai");
const { MissingError } = require("..");

describe("MissingError#constructor", () => {
  it('should create a new MissingError instance given a \'null\' argument value: (null, "argument", "Lawyer#argue").', () => {
    const actual = new MissingError(null, "argument", "Lawyer#argue");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Lawyer#argue expected `argument` to be defined. `argument` is 'null'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const expectedArgumentName = "argument";
    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal(expectedArgumentName);
  });

  it("should create a new MissingError instance given a 'null' argument value: (null, \"argument\").", () => {
    const actual = new MissingError(null, "argument");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "We expected `argument` to be defined. `argument` is 'null'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const expectedArgumentName = "argument";
    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal(expectedArgumentName);
  });

  it("should create a new MissingError instance given a 'null' argument value: (null, null, \"Lawyer#argue\").", () => {
    const actual = new MissingError(null, null, "Lawyer#argue");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Lawyer#argue expected an argument to be defined. It is 'null'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.be.null;
  });

  it('should create a new MissingError instance given an \'undefined\' argument value: (undefined, "argument", "Lawyer#argue").', () => {
    const actual = new MissingError(undefined, "argument", "Lawyer#argue");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Lawyer#argue expected `argument` to be defined. `argument` is 'undefined'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const expectedArgumentName = "argument";
    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal(expectedArgumentName);
  });

  it("should create a new MissingError instance given an 'undefined' argument value: (undefined, \"argument\").", () => {
    const actual = new MissingError(undefined, "argument");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "We expected `argument` to be defined. `argument` is 'undefined'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const expectedArgumentName = "argument";
    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal(expectedArgumentName);
  });

  it("should create a new MissingError instance given an 'undefined' argument value: (undefined, null, \"Lawyer#argue\").", () => {
    const actual = new MissingError(undefined, null, "Lawyer#argue");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Lawyer#argue expected an argument to be defined. It is 'undefined'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.be.null;
  });

  it("should create a new MissingError instance given an 'undefined' argument value: no arguments.", () => {
    const actual = new MissingError();

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "We expected an argument to be defined. It is 'undefined'.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.be.undefined;
  });

  it('should create a new MissingError instance even when given a defined argument value: ("whyDefined", "badUsage", "Coder#useWrong").', () => {
    // If a coder constructs this class with a defined argument, they are using
    // this constructor wrong. The coder is already throwing an error, so let us
    // just display a weird message instead of throwing a different error.

    const actual = new MissingError("whyDefined", "badUsage", "Coder#useWrong");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "MissingError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Why are you creating a MissingError with a defined `argumentValue`: 'whyDefined'?";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal("badUsage");
  });
});
