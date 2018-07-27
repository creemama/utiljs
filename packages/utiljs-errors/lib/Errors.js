"use strict";

/**
 * JavaScript utility methods for [errors]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 * @public
 * @class
 */
class Errors {
  /**
   * A wrapper of another error used for rethrowing.
   *
   * This error preserves information about the original error and its stack trace.
   *
   * A [Stack Overflow]{@link https://stackoverflow.com/questions/42754270/re-throwing-exception-in-nodejs-and-not-losing-stack-trace} article inspired this class.
   *
   * @example
   * function throwATypeError() {
   *   throw new TypeError("Invalid Argument");
   * }
   *
   * function rethrowTheTypeError() {
   *   try {
   *     throwATypeError();
   *   } catch (error) {
   *     throw new RethrownError(error, "Lorem Ipsum");
   *   }
   * }
   *
   * try {
   *   rethrowTheTypeError();
   * } catch (error) {
   *   console.log(error.stack);
   *   // This outputs a stack trace like the following:
   *   //
   *   // RethrownError: Lorem Ipsum
   *   //     at rethrowTheTypeError (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:16:15)
   *   // TypeError: Invalid Argument
   *   //     at throwATypeError (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:10:13)
   *   //     at rethrowTheTypeError (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:14:9)
   *   //     at Context.it (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:20:7)
   *   //     ...
   * }
   *
   * @param {Error} error The error to rethrow
   * @param {String} [message] A human-readable description of the error
   * @throws {TypeError} if the given error is not defined
   * @public
   * @class
   */
  get RethrownError() {
    return require("./RethrownError");
  }
}

module.exports = Errors;
