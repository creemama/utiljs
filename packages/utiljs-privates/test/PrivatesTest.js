"use strict";

const { expect } = require("chai"),
  Privates = require(".."),
  { RethrownError } = require("@util.js/errors");

const ExampleUsingGet = (function() {
  const privates = new Privates();

  class ExampleUsingGet {
    constructor(options) {
      privates.setProps(this, options);
    }
    getProperty1() {
      return property1(this);
    }
    getProperty2() {
      return property2(this);
    }
  }

  function get(thiz, privatePart) {
    return privates.get(thiz, privatePart);
  }
  function property1(thiz) {
    return get(thiz, "property1");
  }
  function property2(thiz) {
    return get(thiz, "property2");
  }

  return ExampleUsingGet;
})();

const ExampleUsingCall = (function() {
  const privates = new Privates();

  class ExampleUsingCall {
    constructor(options) {
      privates.setProps(this, options);
    }
    getProperty1() {
      return property1(this);
    }
    getProperty2() {
      return property2(this);
    }
  }

  function call(thiz, privatePart) {
    return privates.call(thiz, privatePart);
  }
  function property1(thiz) {
    return call(thiz, "property1");
  }
  function property2(thiz) {
    return call(thiz, "property2");
  }

  return ExampleUsingCall;
})();

describe("Privates", () => {
  it("should hide member variables using Privates#get", () => {
    const example = new ExampleUsingGet({
      property1: "a",
      property2: 2
    });
    expect(example.property1).to.be.undefined;
    expect(example.property2).to.be.undefined;
    expect(example.getProperty1()).to.eql("a");
    expect(example.getProperty2()).to.eql(2);
  });
  it("should hide member variables using Privates#call", () => {
    const example = new ExampleUsingCall({
      property1: () => "a",
      property2: () => 2
    });
    expect(example.property1).to.be.undefined;
    expect(example.property2).to.be.undefined;
    expect(example.getProperty1()).to.eql("a");
    expect(example.getProperty2()).to.eql(2);
  });
});
