"use strict";

/*
 * See {@link Errors#AsyncError}.
 */
module.exports = class AsyncError extends Error {
  constructor(callerError, asyncError, message) {
    super(message || asyncError.message);
    if (!callerError)
      throw new TypeError(
        `${this.constructor.name}'s constructor expects a defined callerError, but it was ${callerError}.`
      );
    if (!asyncError)
      throw new TypeError(
        `${this.constructor.name}'s constructor expects a defined asyncError, but it was ${asyncError}.`
      );
    this.name = this.constructor.name;
    this.original = asyncError;
    this.newStack = this.stack;
    const callerStack =
      "    at " + callerError.stack.split("    at ").splice(2).join("    at ");
    // If asyncError.stack is falsy, then let us just try asyncError;
    // asyncError may be a string.
    this.stack = `${this.stack}\n${callerStack}\n${
      asyncError.stack || asyncError
    }`;
  }
};
