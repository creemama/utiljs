"use strict";

/*
 * See {@link Errors#RethrownError}.
 */
class RethrownError extends Error {
  constructor(error, message) {
    super(message);
    if (!error)
      throw new TypeError(
        `RethrownError's constructor expects a defined error, but it was ${error}.`
      );
    this.name = this.constructor.name;
    this.original = error;
    this.newStack = this.stack;
    const messageLines = (this.message.match(/\n/g) || []).length + 1;
    this.stack =
      this.stack
        .split("\n")
        .slice(0, messageLines + 1)
        .join("\n") +
      "\n" +
      error.stack;
  }
}

module.exports = RethrownError;
