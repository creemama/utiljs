"use strict";

/**
 * JavaScript utility methods for emails
 * @public
 * @class
 */
class Emails {
  /**
   * Returns whether the given string is a valid email.
   *
   * The regular expression used to validate strings comes from a [W3C article]{@link https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html}.
   *
   * @param {string} string The string to test
   * @return {boolean} true if the given string is a valid email or false otherwise
   * @public
   * @instance
   * @function
   */
  isValidEmail(string) {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      string
    );
  }

  /**
   * Wraps the given nameValueArrayOfHeaders inside an object that makes email-header lookup easy.
   *
   * When using the returned object, you no longer have to worry about the case (e.g., "In-Reply-To" or "In-reply-to") of email headers.
   *
   * [googleapis]{@link https://www.npmjs.com/package/googleapis}'s interface to Gmail returns email headers as an array of name-value objects. The following is a sample:
   * <pre>
   * [ { name: 'Delivered-To', value: 'c@creemama.com' },
   * ...
   *   { name: 'Date', value: 'Tue, 10 Jul 2018 10:18:52 -0700' },
   * ...
   *   { name: 'To', value: 'Chris Topher <c@creemama.com>' } ]
   * </pre>
   *
   * @param {Array} nameValueArrayOfHeaders An array of name-value objects containing email headers
   * @return {EmailHeaders} A new {@link EmailHeaders} instance
   * @throws {TypeError} If nameValueArrayOfHeaders is not an array-like object containing name-value objects
   * @public
   * @instance
   * @function
   */
  wrapHeaders(nameValueArrayOfHeaders) {
    const headerMap = {};
    const lowercaseHeaderMap = {};
    for (const header of nameValueArrayOfHeaders) {
      headerMap[header.name] = header.value;
      lowercaseHeaderMap[header.name.toLowerCase()] = header.value;
    }
    const EmailHeaders = requireEmailHeaders();
    return new EmailHeaders({
      headerMap,
      lowercaseHeaderMap
    });
  }
}

module.exports = Emails;

const dependencies = {};

function requireEmailHeaders() {
  return (
    dependencies["EmailHeaders"] ||
    (dependencies["EmailHeaders"] = require("./EmailHeaders"))
  );
}
