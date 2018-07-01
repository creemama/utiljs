"use strict";

module.exports = Objects;

function Objects() {
  this.guarantee = Objects_guaranteeObject;
  this.isDefined = Objects_isDefined;
  this.keys = Object.keys;
  this.merge = Objects_merge;

  // This method is useful when determining
  // if an integer variable is defined or not,
  // since 0 is false and may be valid.
  function Objects_isDefined(obj) {
    return obj !== null && typeof obj !== "undefined";
  }

  function Objects_guaranteeObject(obj) {
    return Objects_isDefined(obj) ? obj : {};
  }

  function Objects_merge(a, b) {
    var c = Objects_guaranteeObject(a);
    var d = Objects_guaranteeObject(b);
    var merged = {};
    for (var p in c) if (c.hasOwnProperty(p)) merged[p] = c[p];
    for (var p in d) if (d.hasOwnProperty(p)) merged[p] = d[p];
    return merged;
  }
}
