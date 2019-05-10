"use strict";

const { expect } = require("chai");
const { FalsyError } = require("..");

describe("FalsyError#constructor", () => {
  it('should create a new FalsyError instance given a falsy argument value: (null, "argument", "Lawyer#argue").', () => {
    const actual = new FalsyError(null, "argument", "Lawyer#argue");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "FalsyError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Lawyer#argue expected `argument` to be truthy. `argument` is the falsy value null.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const expectedArgumentName = "argument";
    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal(expectedArgumentName);
  });

  it('should create a new FalsyError instance given a falsy argument value: (0, "argument").', () => {
    const actual = new FalsyError(0, "argument");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "FalsyError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "We expected `argument` to be truthy. `argument` is the falsy value 0.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const expectedArgumentName = "argument";
    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal(expectedArgumentName);
  });

  it('should create a new FalsyError instance given a falsy argument value: ("", null, "Lawyer#argue").', () => {
    const actual = new FalsyError("", null, "Lawyer#argue");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "FalsyError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Lawyer#argue expected an argument to be truthy. It is the falsy value ''.";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.be.null;
  });

  it('should create a new FalsyError instance even when given a truthy argument value: ("whyTruthy", "badUsage", "Coder#useWrong").', () => {
    // If a coder constructs this class with a truthy argument, they are using
    // this constructor wrong. The coder is already throwing an error, so let us
    // just display a weird message instead of throwing a different error.

    const actual = new FalsyError("whyTruthy", "badUsage", "Coder#useWrong");

    expect(actual).to.be.an.instanceof(TypeError);

    const expectedName = "FalsyError";
    const actualName = actual.name;
    expect(actualName).to.equal(expectedName);

    const expectedMessage =
      "Why are you creating a FalsyError with a truthy `argumentValue`: 'whyTruthy'?";
    const actualMessage = actual.message;
    expect(actualMessage).to.equal(expectedMessage);

    const actualArgumentName = actual.argumentName;
    expect(actualArgumentName).to.equal("badUsage");
  });
});
