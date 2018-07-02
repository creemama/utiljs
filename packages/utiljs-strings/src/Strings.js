"use strict";

module.exports = Strings;

function Strings(options) {
  this.fromCharCode = String.fromCharCode;
  this.fromCodePoint = String.fromCodePoint;
  this.raw = String.raw;

  this.endsWith = endsWith;
  this.pad = pad;
  this.stripTags = stripTags;

  const o = Object.assign({}, options);

  this.base64UrlEncode = base64url().encode;
  this.base64UrlDecode = base64url().decode;
  this.base64ToBase64Url = base64url().fromBase64;
  this.base64UrlToBase64 = base64url().toBase64;
  this.base64UrlToBuffer = base64url().toBuffer;

  function base64url() {
    return o.base64url;
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
  function endsWith(str, searchString, position) {
    var subjectString = str.toString();
    if (position === undefined || position > subjectString.length)
      position = subjectString.length;
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

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

  // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
  function stripTags(str) {
    return str.replace(/(<([^>]+)>)/gi, "");
  }
}
