"use strict";

const { expect } = require("chai"),
  Privates = require(".."),
  { RethrownError } = require("@util.js/errors");

const ExampleUsingGet = (function () {
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

const ExampleUsingCall = (function () {
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
      property2: 2,
    });
    expect(example.property1).to.be.undefined;
    expect(example.property2).to.be.undefined;
    expect(example.getProperty1()).to.eql("a");
    expect(example.getProperty2()).to.eql(2);
  });
  it("should hide member variables using Privates#call", () => {
    const example = new ExampleUsingCall({
      property1: () => "a",
      property2: () => 2,
    });
    expect(example.property1).to.be.undefined;
    expect(example.property2).to.be.undefined;
    expect(example.getProperty1()).to.eql("a");
    expect(example.getProperty2()).to.eql(2);
  });
});

describe("Privates#call", () => {
  const privates = new Privates();
  it("should correctly call privates that are functions", () => {
    const thiz = {};

    // Test a lambda function.
    privates.set(thiz, "lambda", () => "lambdaObj");
    expect(privates.call(thiz, "lambda")).to.eql("lambdaObj");

    // Test a declared function.
    function func() {
      return "funcObj";
    }
    privates.set(thiz, "function", func);
    expect(privates.call(thiz, "function")).to.eql("funcObj");

    // Test a class function.
    class CallClass {
      delegate() {
        return "classObj";
      }

      call() {
        return this.delegate();
      }
    }
    const c = new CallClass();
    privates.set(thiz, "classBound", c.call.bind(c));

    // Test an object as a property.
    const key = { a: "a" };
    privates.set(thiz, key, () => "objectAsProperty");
    expect(privates.call(thiz, key)).to.eql("objectAsProperty");

    // Test a symbol as a property.
    const symbol = Symbol("symbol");
    privates.set(thiz, symbol, () => "symbolAsProperty");
    expect(privates.call(thiz, symbol)).to.eql("symbolAsProperty");

    // Test a number as a property.
    privates.set(thiz, -5, () => "numberAsProperty");
    expect(privates.call(thiz, -5)).to.eql("numberAsProperty");

    // Test a boolean as a property.
    privates.set(thiz, false, () => "booleanAsProperty");
    expect(privates.call(thiz, false)).to.eql("booleanAsProperty");

    // Test undefined as a property.
    privates.set(thiz, undefined, () => "undefinedAsProperty");
    expect(privates.call(thiz, undefined)).to.eql("undefinedAsProperty");

    // Test null as a property.
    privates.set(thiz, null, () => "nullAsProperty");
    expect(privates.call(thiz, null)).to.eql("nullAsProperty");
  });
  it("should fail with invalid arguments", () => {
    const thiz = {};

    expect(() => privates.call()).to.throw(RethrownError);
    expect(() => privates.call(null, "nonexistent")).to.throw(RethrownError);
    expect(() => privates.call(thiz)).to.throw(RethrownError);
    expect(() => privates.call(thiz, "nonexistent")).to.throw(RethrownError);

    // Test an unbound function failing.
    class CallClass {
      delegate() {
        return "classObj";
      }

      call() {
        return this.delegate();
      }
    }
    const c = new CallClass();
    privates.set(thiz, "classBound", c.call);
    expect(() => privates.call(thiz, "classBound")).to.throw(RethrownError);

    // Test a private that is not a function.
    privates.set(thiz, "notafunction", "string");
    expect(() => privates.call(thiz, "notafunction")).to.throw(RethrownError);
  });
});

describe("Privates#lambdaize", () => {
  const privates = new Privates();
  it("should convert an object's properties to lambda properties", () => {
    const obj = privates.lambdaize({
      a: 0,
      b: 1,
    });
    expect(obj.a()).to.eql(0);
    expect(obj.b()).to.eql(1);

    expect(privates.lambdaize(true)).to.eql({});
    expect(privates.lambdaize(1)).to.eql({});
    expect(Object.keys(privates.lambdaize("string"))).to.eql([
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
    expect(privates.lambdaize(Symbol("string"))).to.eql({});
    expect(privates.lambdaize({})).to.eql({});
  });
  it("should fail with invalid arguments", () => {
    expect(() => privates.lambdaize()).to.throw(RethrownError);
    expect(() => privates.lambdaize(null)).to.throw(RethrownError);
    expect(() => privates.lambdaize(undefined)).to.throw(RethrownError);
  });
});
