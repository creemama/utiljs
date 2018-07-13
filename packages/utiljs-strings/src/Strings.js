"use strict";

module.exports = Strings;

/**
 * JavaScript utility methods for strings
 *
 * @param {Object} options - object containing the dependencies of this class
 * @public
 * @class
 */
function Strings(options) {
  this.base64ToBase64Url = base64url().fromBase64;

  this.base64UrlDecode = base64url().decode;

  this.base64UrlEncode = base64url().encode;

  this.base64UrlToBase64 = base64url().toBase64;

  this.base64UrlToBuffer = base64url().toBuffer;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  this.endsWith = endsWith;
  function endsWith(str, searchString, position) {
    var subjectString = str.toString();
    if (position === undefined || position > subjectString.length)
      position = subjectString.length;
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

  this.fromCharCode = String.fromCharCode;

  this.fromCodePoint = String.fromCodePoint;

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
  this.isString = isString;
  function isString(object) {
    return typeof object === "string" || object instanceof String;
  }

  this.pad = pad;
  function pad(n, width, z) {
    z = z || "0";
    z = z + "";
    if (z.length > 1)
      throw new Error(
        "The padding character must have a length of 1 but was " + z.length
      );
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  this.raw = String.raw;

  // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
  this.stripTags = stripTags;
  function stripTags(str) {
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  function base64url() {
    return options.base64url();
  }
}
