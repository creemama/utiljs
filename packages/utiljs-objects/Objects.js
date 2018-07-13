"use strict";

module.exports = function Objects() {
  this.assign = Object.assign;

  this.create = Object.create;

  this.defineProperties = Object.defineProperties;

  this.defineProperty = Object.defineProperty;

  this.entries = Object.entries;

  this.freeze = Object.freeze;

  this.guarantee = guarantee;
  function guarantee(obj) {
    return isDefined(obj) ? obj : {};
  }

  this.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  this.getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

  this.getOwnPropertyNames = Object.getOwnPropertyNames;

  this.getOwnPropertySymbols = Object.getOwnPropertySymbols;

  this.getPrototypeOf = Object.getPrototypeOf;

  this.is = Object.is;

  /**
   * Returns whether the specified obj is defined.
   *
   * In other words, this method returns false if and only if the object is
   * null or undefined.
   *
   * This method is useful when an expression like the following might return false when you expected true:
   * <pre><code>
   * if (x) console.log("x is defined.");
   * </code></pre>
   * This happens for [0, -0, NaN, false, and the empty string ("")]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean}.
   */
  this.isDefined = isDefined;
  function isDefined(obj) {
    return obj !== null && typeof obj !== "undefined";
  }

  this.isExtensible = Object.isExtensible;

  this.isFrozen = Object.isFrozen;

  this.isSealed = Object.isSealed;

  this.keys = Object.keys;

  this.merge = merge;
  function merge(a, b) {
    let c = guarantee(a);
    let d = guarantee(b);
    let merged = {};
    for (let p in c) if (c.hasOwnProperty(p)) merged[p] = c[p];
    for (let p in d) if (d.hasOwnProperty(p)) merged[p] = d[p];
    return merged;
  }

  this.seal = Object.seal;

  this.setPrototypeOf = Object.setPrototypeOf;

  this.values = Object.values;
};
