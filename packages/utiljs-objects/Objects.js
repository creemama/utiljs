"use strict";

module.exports = function Objects() {
  this.assign = Object.assign;
  this.create = Object.create;
  this.defineProperties = Object.defineProperties;
  this.defineProperty = Object.defineProperty;
  this.entries = Object.entries;
  this.freeze = Object.freeze;
  this.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  this.getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
  this.getOwnPropertyNames = Object.getOwnPropertyNames;
  this.getOwnPropertySymbols = Object.getOwnPropertySymbols;
  this.getPrototypeOf = Object.getPrototypeOf;
  this.is = Object.is;
  this.isExtensible = Object.isExtensible;
  this.isFrozen = Object.isFrozen;
  this.isSealed = Object.isSealed;
  this.keys = Object.keys;
  this.seal = Object.seal;
  this.setPrototypeOf = Object.setPrototypeOf;
  this.values = Object.values;

  this.guarantee = guarantee;
  this.isDefined = isDefined;
  this.merge = merge;

  function guarantee(obj) {
    return isDefined(obj) ? obj : {};
  }

  // This method is useful when determining
  // if an integer variable is defined or not,
  // since 0 is false and may be valid.
  function isDefined(obj) {
    return obj !== null && typeof obj !== "undefined";
  }

  function merge(a, b) {
    let c = guarantee(a);
    let d = guarantee(b);
    let merged = {};
    for (let p in c) if (c.hasOwnProperty(p)) merged[p] = c[p];
    for (let p in d) if (d.hasOwnProperty(p)) merged[p] = d[p];
    return merged;
  }
};
