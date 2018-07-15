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
}

module.exports = Emails;
