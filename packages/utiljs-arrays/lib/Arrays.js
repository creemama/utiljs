"use strict";

/**
 * JavaScript utility methods for [arrays]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array}
 * @public
 * @class
 */
class Arrays {
  /**
   * Creates a new, shallow-copied Array instance from an array-like or iterable object.
   *
   * See MDN's documentation about [from]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from}.
   *
   * @param arrayLike An array-like or iterable object to convert to an array
   * @param {Function} [mapFn] Map function to call on every element of the array
   * @param {Object} [thisArg] Value to use as this when executing mapFn
   * @return {Array} A new Array instance
   * @public
   * @instance
   * @function
   */
  from() {
    return Array.from(...arguments);
  }

  /**
   * Determines whether the passed value is an Array.
   *
   * See MDN's documentation about [isArray]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray}.
   *
   * @param {*} obj The object to be checked
   * @return {boolean} true if the object is an Array or false otherwise
   * @public
   * @instance
   * @function
   */
  isArray() {
    return Array.isArray(...arguments);
  }

  /**
   * Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments
   *
   * See MDN's documentation about [of]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of}.
   *
   * @param {...*} elementN Elements of which to create the array
   * @return {Array} A new Array instance
   * @public
   * @instance
   * @function
   */
  of() {
    return Array.of(...arguments);
  }

  /**
   * Shuffles the elements of the specified array.
   *
   * See [knuth-shuffle]{@link https://www.npmjs.com/package/knuth-shuffle}.
   *
   * @param {Array} array The array to shuffle
   * @return {Array} A new Array instance
   * @public
   * @instance
   * @function
   */
  shuffle(array) {
    return knuthshuffle().knuthShuffle(this.from(array));
  }

  /**
   * Sorts the elements of an array and (unlike returns a **new array** with the sorted elements. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
   *
   * See [knuth-shuffle]{@link https://www.npmjs.com/package/knuth-shuffle}.
   *
   * @param {Array} array The array to shuffle
   * @return {Array} A new Array instance
   * @public
   * @instance
   * @function
   */
  sort(array, compareFunction) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // https://stackoverflow.com/questions/9592740/how-can-you-sort-an-array-without-mutating-the-original-array
    // https://stackoverflow.com/a/9592755
    return Array.prototype.slice.call(array).sort(compareFunction);
  }
}

module.exports = Arrays;

const dependencies = {};

function knuthshuffle() {
  return (
    dependencies["knuth-shuffle"] ||
    (dependencies["knuth-shuffle"] = require("knuth-shuffle"))
  );
}
