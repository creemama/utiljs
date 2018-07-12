"use strict";

class Objects {
  assign() {
    return Object.assign(...arguments);
  }

  create() {
    return Object.create(...arguments);
  }

  defineProperties() {
    return Object.defineProperties(...arguments);
  }

  defineProperty() {
    return Object.defineProperty(...arguments);
  }

  entries() {
    return Object.entries(...arguments);
  }

  freeze() {
    return Object.freeze(...arguments);
  }

  getOwnPropertyDescriptor() {
    return Object.getOwnPropertyDescriptor(...arguments);
  }

  getOwnPropertyDescriptors() {
    return Object.getOwnPropertyDescriptors(...arguments);
  }

  getOwnPropertyNames() {
    return Object.getOwnPropertyNames(...arguments);
  }

  getOwnPropertySymbols() {
    return Object.getOwnPropertySymbols(...arguments);
  }

  getPrototypeOf() {
    return Object.getPrototypeOf(...arguments);
  }

  guarantee(obj) {
    return this.isDefined(obj) ? obj : {};
  }

  is() {
    return Object.is(...arguments);
  }

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
  isDefined(obj) {
    return obj !== null && typeof obj !== "undefined";
  }

  isExtensible() {
    return Object.isExtensible(...arguments);
  }

  isFrozen() {
    return Object.isFrozen(...arguments);
  }

  isSealed() {
    return Object.isSealed(...arguments);
  }

  keys() {
    return Object.keys(...arguments);
  }

  merge(a, b) {
    let c = this.guarantee(a);
    let d = this.guarantee(b);
    let merged = {};
    for (let p in c) if (c.hasOwnProperty(p)) merged[p] = c[p];
    for (let p in d) if (d.hasOwnProperty(p)) merged[p] = d[p];
    return merged;
  }

  seal() {
    return Object.seal(...arguments);
  }

  setPrototypeOf() {
    return Object.setPrototypeOf(...arguments);
  }

  values() {
    return Object.values(...arguments);
  }
}

module.exports = Objects;
