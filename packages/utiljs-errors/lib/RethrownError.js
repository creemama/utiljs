"use strict";

/*
 * See {@link Errors#RethrownError}.
 */
module.exports = class RethrownError extends Error {
  constructor(error, message) {
    super(message || error.message);
    if (!error)
      throw new TypeError(
        `RethrownError's constructor expects a defined error, but it was ${error}.`
      );
    this.name = this.constructor.name;
    this.original = error;
    this.newStack = this.stack;
    this.stack = `${this.stack}\n${error.stack}`;
  }
};
