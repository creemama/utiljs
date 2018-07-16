"use strict";

/**
 * Wrapper of email headers that makes header lookup easy.
 *
 * This class makes it so that the case of header names is not important.
 * For example, Gmail might use "In-Reply-To" whereas iCloud might use "In-reply-to".
 *
 * @public
 * @class
 */
class EmailHeaders {
  constructor(options) {
    dependencies.set(this, options);
  }

  /**
   * Returns the value of the Delivered-To header
   *
   * @return {undefined|string} The value of the Date header as a string or undefined
   * @public
   * @instance
   * @function
   */
  deliveredTo() {
    return this.get("delivered-to");
  }

  /**
   * Returns the value of the Date header
   *
   * @return {undefined|string} The value of the Date header as a string or undefined
   * @public
   * @instance
   * @function
   */
  date() {
    return this.get("date");
  }

  /**
   * Returns the value of the From header
   *
   * @return {undefined|string} The value of the From header as a string or undefined
   * @public
   * @instance
   * @function
   */
  from() {
    return this.get("from");
  }

  /**
   * Returns the value of the given headerName
   *
   * @param {string} headerName The header to look up a value for
   * @return {undefined|string} The value of the given header name as a string or undefined
   * @throws {TypeError} If headerName does not have a toLowerCase function
   * @public
   * @instance
   * @function
   */
  get(headerName) {
    return lowercaseHeaderMap(this)[headerName.toLowerCase()];
  }

  /**
   * Returns the value of the In-Reply-To header
   *
   * @return {undefined|string} The value of the In-Reply-To header as a string or undefined
   * @public
   * @instance
   * @function
   */
  inReplyTo() {
    return this.get("in-reply-to");
  }

  /**
   * Returns the value of the Message-Id header
   *
   * @return {undefined|string} The value of the Message-Id header as a string or undefined
   * @public
   * @instance
   * @function
   */
  messageId() {
    return this.get("message-id");
  }

  /**
   * Returns the value of the References header
   *
   * @return {undefined|string} The value of the References header as a string or undefined
   * @public
   * @instance
   * @function
   */
  references() {
    return this.get("references");
  }

  /**
   * Returns the value of the Subject header
   *
   * @return {undefined|string} The value of the Subject header as a string or undefined
   * @public
   * @instance
   * @function
   */
  subject() {
    return this.get("subject");
  }

  /**
   * Returns the value of the To header
   *
   * @return {undefined|string} The value of the To header as a string or undefined
   * @public
   * @instance
   * @function
   */
  to() {
    return this.get("to");
  }

  /**
   * Returns a string listing the email-header names and values of this object
   *
   * @return {string} A string representation of this object
   * @public
   * @instance
   * @function
   */
  toString() {
    return "EmailHeaders " + json().stringify(headerMap(this), null, "  ");
  }
}

module.exports = EmailHeaders;

const dependencies = new WeakMap();
function get(thiz, dependency) {
  return dependencies.get(thiz)[dependency];
}

function headerMap(thiz) {
  return get(thiz, "headerMap");
}
function json() {
  return JSON;
}
function lowercaseHeaderMap(thiz) {
  return get(thiz, "lowercaseHeaderMap");
}
