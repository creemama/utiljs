"use strict";

/**
 * JavaScript utility methods for strings
 * @public
 * @class
 */
class Strings {
  base64ToBase64Url() {
    return base64url().fromBase64(...arguments);
  }

  base64UrlDecode() {
    return base64url().decode(...arguments);
  }

  base64UrlEncode() {
    return base64url().encode(...arguments);
  }

  base64UrlToBase64() {
    return base64url().toBase64(...arguments);
  }

  base64UrlToBuffer() {
    return base64url().toBuffer(...arguments);
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  endsWith(str, searchString, position) {
    const subjectString = str.toString();
    if (position === undefined || position > subjectString.length)
      position = subjectString.length;
    position -= searchString.length;
    const lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

  fromCharCode() {
    return String.fromCharCode(...arguments);
  }

  fromCodePoint() {
    return String.fromCodePoint(...arguments);
  }

  /**
   * Returns whether the specified object is an instance of string or not.
   *
   * This implementation comes from a [Stack Overflow answer]{@link https://stackoverflow.com/a/9436948}.
   *
   * @param {Object} object - the object to test
   * @returns {boolean} true if the specified object is an instance of string and false otherwise
   * @public
   * @function
   */
  isString(object) {
    return typeof object === "string" || object instanceof String;
  }

  pad(n, width, z) {
    z = z || "0";
    z = z + "";
    if (z.length > 1)
      throw new Error(
        "The padding character must have a length of 1 but was " + z.length
      );
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  raw() {
    return String.raw(...arguments);
  }

  // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
  stripTags(str) {
    return str.replace(/(<([^>]+)>)/gi, "");
  }
}

module.exports = Strings;

const dependencies = {};
function get(dependency) {
  return (
    dependencies[dependency] || (dependencies[dependency] = require(dependency))
  );
}

function base64url() {
  return get("base64url");
}
