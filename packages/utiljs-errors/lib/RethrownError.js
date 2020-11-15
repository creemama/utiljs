"use strict";

/*
 * See {@link Errors#RethrownError}.
 */
module.exports = class RethrownError extends Error {
  constructor(error, message) {
    super(message != null ? message : getErrorProperty(error, "message"));
    if (!error)
      throw new TypeError(
        `RethrownError's constructor expects a defined error, but it was ${error}.`
      );
    this.name = this.constructor.name;
    this.original = error;
    this.newStack = this.stack;
    const errorStack = getErrorProperty(error, "stack");
    this.stack = `${this.stack}\n${errorStack}`;
  }
};

function getErrorProperty(error, property) {
  if (error[property]) return error[property];
  try {
    return JSON.stringify(error);
  } catch (e) {
    // JSON.stringify might throw the following, "TypeError: Converting circular
    // structure to JSON."
    return error;
  }
}
