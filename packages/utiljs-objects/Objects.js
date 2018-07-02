"use strict";

module.exports = function Objects() {
  this.guarantee = guarantee;
  this.isDefined = isDefined;
  this.keys = Object.keys;
  this.merge = merge;

  // This method is useful when determining
  // if an integer variable is defined or not,
  // since 0 is false and may be valid.
  function isDefined(obj) {
    return obj !== null && typeof obj !== "undefined";
  }

  function guarantee(obj) {
    return isDefined(obj) ? obj : {};
  }

  function merge(a, b) {
    let c = guarantee(a);
    let d = guarantee(b);
    let merged = {};
    for (let p in c) if (c.hasOwnProperty(p)) merged[p] = c[p];
    for (let p in d) if (d.hasOwnProperty(p)) merged[p] = d[p];
    return merged;
  }
}
