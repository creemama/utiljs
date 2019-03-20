"use strict";

/**
 * JavaScript utility methods for [errors]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 * @public
 * @class
 */
class Errors {
  /**
   * Wraps the given promise so that errors caught preserve the stack trace of the calling thread.
   *
   * The example compares the stack trace of a rejected promise using this method and the stack trace of a rejected promise that does not use this method.
   *
   * @example
   * const errors = require("@util.js/errors");
   * function rejectAPromise() {
   *   return Promise.reject(new TypeError("Fail!"));
   * }
   *
   * errors
   *   .catch(rejectAPromise())
   *   .catch(error => console.log("\n\nWith Caller Stack Trace\n" + error.stack));
   * // With Caller Stack Trace
   * // AsyncError: Fail!
   * //     at promise.catch.error (/root/utiljs/packages/utiljs-errors/lib/Errors.js:28:13)
   * //     at process._tickCallback (internal/process/next_tick.js:68:7)
   * //     at Function.Module.runMain (internal/modules/cjs/loader.js:746:11)
   * //     at startup (internal/bootstrap/node.js:240:19)
   * //     at bootstrapNodeJSCore (internal/bootstrap/node.js:564:3)
   * //     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:23:11)
   * //     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
   * //     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
   * //     at Module._compile (internal/modules/cjs/loader.js:702:30)
   * //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
   * //     at Module.load (internal/modules/cjs/loader.js:612:32)
   * //     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
   * //     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
   * //     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
   * // TypeError: Fail!
   * //     at rejectAPromise (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:20:27)
   * //     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:23:12)
   * //     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
   * //     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
   * //     at Module._compile (internal/modules/cjs/loader.js:702:30)
   * //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
   * //     at Module.load (internal/modules/cjs/loader.js:612:32)
   * //     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
   * //     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
   * //     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
   *
   * rejectAPromise().catch(error =>
   *   console.log("\n\nWithout Caller Stack Trace\n" + error.stack)
   * );
   * // Without Caller Stack Trace
   * // TypeError: Fail!
   * //     at rejectAPromise (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:20:27)
   * //     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:53:3)
   * //     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
   * //     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
   * //     at Module._compile (internal/modules/cjs/loader.js:702:30)
   * //     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
   * //     at Module.load (internal/modules/cjs/loader.js:612:32)
   * //     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
   * //     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
   * //     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
   *
   * @param {Promise} promise The promise to wrap
   * @param {String} [message] A human-readable description of the error
   * @return {Promise} A promise that upon rejection wraps the error in an AsyncError and rethrows
   * @throws {TypeError} If the given promise is not an instance of Promise
   */
  catch(promise, message) {
    const callerError = new Error();
    return promise.catch(error => {
      throw new this.AsyncError(callerError, error, message);
    });
  }

  /**
   * An error that preserves the stack trace of the thread that calls an asynchronous function.
   *
   * Use {@link Errors#catch} to use this class. Use this class directly for instanceof checks.
   *
   * @public
   * @class
   */
  get AsyncError() {
    return require("./AsyncError");
  }

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
