"use strict";

/**
 * JavaScript utility methods for [objects]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object}
 * @public
 * @class
 */
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
   * Returns whether the specified obj is defined (i.e., not null and not undefined).
   *
   * In other words, this method returns false if and only if the object is
   * null or undefined.
   *
   * This method is useful when an expression like the following might return false when you expected true:
   * <pre><code>
   * if (x) console.log("x is defined.");
   * </code></pre>
   * This happens for [0, -0, NaN, false, and the empty string ("")]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean}.
   *
   * @param {*} object The object to check
   * @return {Boolean} true if the given object is defined or false otherwise
   * @public
   * @instance
   * @function
   */
  isDefined(object) {
    // https://stackoverflow.com/a/15992131
    // return object !== null && typeof object !== "undefined";
    return object != null;
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
    const c = this.guarantee(a);
    const d = this.guarantee(b);
    const merged = {};
    for (const p in c)
      if (Object.prototype.hasOwnProperty.call(c, p)) merged[p] = c[p];
    for (const p in d)
      if (Object.prototype.hasOwnProperty.call(d, p)) merged[p] = d[p];
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
