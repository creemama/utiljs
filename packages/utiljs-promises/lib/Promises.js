"use strict";

/**
 * JavaScript utility methods for [promises]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 * @public
 * @class
 */
class Promises {
  /**
   * Returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises.
   *
   * It rejects with the reason of the first promise that rejects.
   *
   * See MDN's documentation about [all]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all}.
   *
   * There is one minor difference between Promise#all and this method. Promise#all only takes one argument that must be iterable. This method, Promises#all, behaves the same as Promise#all when given one argument; when given multiple arguments, [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments} becomes the iterable.
   *
   * @example
   * const promises = require("utiljs-promises");
   * const promise1 = Promise.resolve(3);
   * const promise2 = 42;
   * const promise3 = new Promise((resolve, reject) => {
   *   setTimeout(resolve, 100, "foo");
   * });
   * promises.all(promise1, promise2, promise3).then(values => {
   *   console.log(values);
   * });
   * // expected output: Array [3, 42, "foo"]
   *
   * @param {iterable|...*} iterable An iterable object such as an Array or String; if you give move than one argument to this method, [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments} becomes the iterable
   * @return {Promise} (A) An already resolved Promise if the iterable passed is empty.
   * (B) An asynchronously resolved Promise if the iterable passed contains no promises.
   * (C) A pending Promise in all other cases; this returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when all the promises in the given iterable have resolved, or if any of the promises reject; returned values will be in order of the Promises passed, regardless of completion order.
   * @public
   * @instance
   * @function
   */
  all() {
    if (arguments.length > 1) return Promise.all(arguments);
    return Promise.all(...arguments);
  }

  /**
   * Calls the given functionOnObjectWithCallback with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.
   *
   * Use this function if you are wrapping an existing function that only takes a callback but would like that function to handle both callbacks and Promises.
   *
   * It is also useful in writing new functions where you would like to support both callbacks and Promises.
   *
   * This function adapts functions that accept a callback. {@link Promises#applyPromise} adapts functions that return a Promise.
   *
   * This function is similar to Function#apply. It accepts a single array of arguments.
   *
   * Function#call and {@link Promises#callCallback} accept an argument list.
   *
   * When trying to remember the difference between #apply and #call, think, "#apply accepts an array. Both array and #apply start with a."
   *
   * @example
   * // Wrap a function that only accepts a callback.
   * const promises = require("utiljs-promises");
   * const stream = require("stream");
   * const streams = require("utiljs-streams");
   * // stream#finished only takes a callback.
   * // Wrap stream#finished so that it handles both callbacks and Promises.
   * function finished() {
   *   return promises.applyCallback(stream, stream.finished, arguments);
   * }
   * const readableToCallback = streams.fromString("Call back, Hypnotoad!");
   * finished(readableToCallback, () => console.log("Finished with a callback"));
   * const readableToPromise = streams.fromString("Promise me, Hypnotoad!");
   * finished(readableToPromise).then(() => console.log("Finished as promised"));
   *
   * @example
   * // Write a function that supports both callbacks and Promises.
   * const promises = require("utiljs-promises");
   * function notify(message, who, callback) {
   *   if (!callback) return promises.applyCallback(null, notify, arguments);
   *   callback(null, `${message}, ${who}!`);
   * }
   * notify("Call back", "Hypnotoad", (error, message) => console.log(message));
   * notify("Promise me", "Hypnotoad").then(console.log);
   *
   * @param {Object} object Value to use as this when executing functionOnObjectWithCallback (can be null)
   * @param {Function} functionOnObjectWithCallback A function that takes a callback as its last argument
   * @param args An array-like object containing the arguments to pass to functionOnObjectWithCallback; this is usually just [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments}
   * @return {undefined|Promise} undefined if the last element of args is a callback or a Promise if args does not contain a callback
   * @throws {TypeError} If functionOnObjectWithCallback is not a function or if args is null or undefined
   * @public
   * @instance
   * @function
   */
  applyCallback(object, functionOnObjectWithCallback, args) {
    if (hasCallback(args))
      return functionOnObjectWithCallback.apply(object, args);
    return this.promisify(functionOnObjectWithCallback).apply(object, args);
  }

  /**
   * Calls the given promiseFunctionOnObject with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.
   *
   * Use this function if you are wrapping an existing function that only returns a Promise but would like that function to handle both callbacks and Promises.
   *
   * It is also useful in writing new functions where you would like to support both callbacks and Promises.
   *
   * This function adapts functions that return a Promise. {@link Promises#applyCallback} adapts functions that accept a callback.
   *
   * This function is similar to Function#apply. It accepts a single array of arguments.
   *
   * Function#call and {@link Promises#callPromise} accept an argument list.
   *
   * When trying to remember the difference between #apply and #call, think, "#apply accepts an array. Both array and #apply start with a."
   *
   * @example
   * // Wrap a function that only returns a Promise.
   * const promises = require("utiljs-promises");
   * function notifyPromise(message, who) {
   *   return promises.resolve(`${message}, ${who}!`);
   * }
   * // #notifyPromise only returns a Promise.
   * // Wrap #notifyPromise so that it handles both callbacks and Promises.
   * function notify(message, who, callback) {
   *   return promises.applyPromise(null, notifyPromise, arguments);
   * }
   * notify("Call back", "Hypnotoad", (error, message) => console.log(message));
   * notify("Promise me", "Hypnotoad").then(console.log);
   *
   * @example
   * // Write a function that supports both callbacks and Promises.
   * const promises = require("utiljs-promises");
   * function notify(message, who, callback) {
   *   if (callback) return promises.applyPromise(null, notify, arguments);
   *   return promises.resolve(`${message}, ${who}!`);
   * }
   * notify("Call back", "Hypnotoad", (error, message) => console.log(message));
   * notify("Promise me", "Hypnotoad").then(console.log);
   *
   * @param {Object} object Value to use as this when executing promiseFunctionOnObject (can be null)
   * @param {Function} promiseFunctionOnObject A function that returns a Promise
   * @param args An array-like object containing the arguments to pass to promiseFunctionOnObject; this is usually just [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments}
   * @return {undefined|Promise} undefined if the last element of args is a callback or a Promise if args does not contain a callback
   * @throws {TypeError} If promiseFunctionOnObject is not a function or if args is null or undefined
   * @public
   * @instance
   * @function
   */
  applyPromise(object, promiseFunctionOnObject, args) {
    if (hasCallback(args))
      return this.callbackify(promiseFunctionOnObject).apply(object, args);
    return promiseFunctionOnObject.apply(object, args);
  }

  /**
   * Calls the given functionOnObjectWithCallback with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.
   *
   * Use this function if you are wrapping an existing function that only takes a callback but would like that function to handle both callbacks and Promises.
   *
   * Other than functionOnObjectWithCallback notifying when an error happens, this promise rejects if functionOnObjectWithCallback is not a function or if you give the wrong number of arguments for functionOnObjectWithCallback.
   *
   * @example
   * const promises = require("utiljs-promises");
   * const stream = require("stream");
   * const streams = require("utiljs-streams");
   * // stream#finished only takes a callback.
   * // Wrap stream#finished so that it handles both callbacks and Promises.
   * function finished() {
   *   return promises.call(stream, stream.finished, arguments);
   * }
   * const readableToCallback = streams.fromString("Call back, Hypnotoad!");
   * finished(readableToCallback, () => console.log("Finished with a callback"));
   * const readableToPromise = streams.fromString("Promise me, Hypnotoad!");
   * finished(readableToPromise).then(() => console.log("Finished as promised"));
   *
   * @param {Object} object Value to use as this when executing functionOnObjectWithCallback (can be null)
   * @param {Function} functionOnObjectWithCallback A function that takes a callback as its last argument
   * @param args An array-like object containing the arguments to pass to functionOnObjectWithCallback; this is usually just [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments}
   * @return {undefined|Promise} undefined if the last element of args is a callback or a Promise if args does not contain a callback
   * @public
   * @instance
   * @function
   */
  call(object, functionOnObjectWithCallback, args) {
    if (hasCallback(args))
      return functionOnObjectWithCallback.apply(object, args);
    return this.promisifyAndCall(object, functionOnObjectWithCallback, ...args);
  }

  /**
   * Wraps the given promiseFunction such that calling the returned function with a callback notifies the callback with an error if promiseFunction rejects or the return value if promiseFunction resolves.
   *
   * Use {@link Promises#callPromise} if you would like to callbackify a method and call it in one line.
   *
   * @example
   * const promises = require("utiljs-promises");
   * function notifyPromise(message, who) {
   *   return promises.resolve(`${message}, ${who}!`);
   * }
   * // #notifyPromise only returns a Promise.
   * // Wrap #notifyPromise so that it accepts a callback.
   * const notify = promises.callbackify(notifyPromise);
   * notify("Call back", "Hypnotoad", (error, message) => console.log(message));
   *
   * @param {Function} promiseFunction A function that returns a Promise
   * @return {Function} A function that accepts a callback
   * @throws {TypeError} If promiseFunction is not a function
   * @public
   * @instance
   * @function
   */
  callbackify(promiseFunction) {
    if (typeof promiseFunction !== "function")
      throw new TypeError(
        `We expected promiseFunction to be function but was ${promiseFunction}.`
      );
    return function() {
      const thiz = this;
      const callback = arguments[arguments.length - 1];
      const argsWithoutCalback = arrays()
        .from(arguments)
        .slice(0, arguments.length - 1);
      let promise;
      try {
        promise = promiseFunction.apply(thiz, argsWithoutCalback);
      } catch (error) {
        return callback(error);
      }
      if (!promise && !promise.then)
        throw new Error(
          `We expected promiseFunction to return a Promise but instead got ${promise}.`
        );
      promise.then(result => callback(null, result)).catch(callback);
      // It is possible for the callback to throw an error.
      // This should be caught by
      // process.on('unhandledRejection', error => { ... });
    };
  }

  /**
   * Calls the given functionOnObjectWithCallback with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.
   *
   * This method just calls:
   * <pre><code>
   * this.applyCallback(object, functionOnObjectWithCallback, args)
   * </code></pre>
   *
   * See {@link Promises#applyCallback}.
   *
   * @example
   * const promises = require("utiljs-promises");
   * function notifyCallback(message, who, callback) {
   *   callback(null, `${message}, ${who}!`);
   * }
   * // #notifyCallback only accpets a callback.
   * // Force #notifyCallback to return a Promise.
   * promises
   *   .callCallback(null, notifyCallback, "Promise me", "Hypnotoad")
   *   .then(console.log);
   *
   * @param {Object} object Value to use as this when executing functionOnObjectWithCallback (can be null)
   * @param {Function} functionOnObjectWithCallback A function that takes a callback as its last argument
   * @param {...*} [args] The arguments to pass to functionOnObjectWithCallback or its promisified version
   * @return {undefined|Promise} undefined if the last element of args is a callback or a Promise if args does not contain a callback
   * @throws {TypeError} If functionOnObjectWithCallback is not a function
   * @public
   * @instance
   * @function
   */
  callCallback(object, functionOnObjectWithCallback, ...args) {
    return this.applyCallback(object, functionOnObjectWithCallback, args);
  }

  /**
   * Calls the given promiseFunctionOnObject with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.
   *
   * This method just calls:
   * <pre><code>
   * this.applyCallback(object, functionOnObjectWithCallback, args)
   * </code></pre>
   *
   * See {@link Promises#applyPromise}.
   *
   * @example
   * const promises = require("utiljs-promises");
   * function notifyPromise(message, who) {
   *   return promises.resolve(`${message}, ${who}!`);
   * }
   * // #notifyPromise only returns a Promise.
   * // Force #notifyPromise to accept a callback.
   * promises.callPromise(
   *   null,
   *   notifyPromise,
   *   "Call back",
   *   "Hypnotoad",
   *   (error, message) => console.log(message)
   * );
   *
   * @param {Object} object Value to use as this when executing promiseFunctionOnObject (can be null)
   * @param {Function} promiseFunctionOnObject A function that returns a Promise
   * @param {...*} [args] The arguments to pass to promiseFunctionOnObject or its callbackified version
   * @return {undefined|Promise} undefined if the last element of args is a callback or a Promise if args does not contain a callback
   * @throws {TypeError} If promiseFunctionOnObject is not a function
   * @public
   * @instance
   * @function
   */
  callPromise(object, promiseFunctionOnObject, ...args) {
    return this.applyPromise(object, promiseFunctionOnObject, args);
  }

  /**
   * Wraps the given functionWithCallback such that calling the returned function returns a Promise that resolves if functionWithCallback succeeds and rejects if functionWithCallback errors
   *
   * Use {@link Promises#promisifyAndCall} if you would like to promisify a method and call it in one line.
   *
   * The returned Promise rejects if functionWithCallback is not a function.
   *
   * @example
   * const promises = require("utiljs-promises");
   * const stream = require("stream");
   * const streams = require("utiljs-streams");
   * // stream#finished only takes a callback.
   * // Let us wrap stream#finished so that it returns a Promise.
   * const readable = streams.fromString("Promise me, Hypnotoad!");
   * const finished = promises.promisify(stream.finished);
   * finished(readable).then(() => console.log("Finished as promised"));
   *
   * @param {Function} functionWithCallback A function that takes a callback as its last argument
   * @return {Function} A function that returns a Promise
   * @public
   * @instance
   * @function
   */
  promisify(functionWithCallback) {
    if (typeof functionWithCallback !== "function")
      throw new TypeError(
        `We expected functionWithCallback to be a function but was ${functionWithCallback}.`
      );
    return function() {
      const args = arguments;
      const thiz = this;
      return new Promise((resolve, reject) => {
        try {
          functionWithCallback.call(thiz, ...args, function(error) {
            if (error) return reject(error);
            if (arguments.length == 1) return resolve.call(null);
            if (arguments.length == 2) return resolve.call(null, arguments[1]);
            const callbackArguments = arrays().from(arguments);
            callbackArguments.shift(); // Remove the first element.
            resolve.call(null, callbackArguments);
          });
        } catch (err) {
          reject(err);
        }
      });
    };
  }

  /**
   * Calls the given functionOnObjectWithCallback with the given args returning a Promise that resolves if functionOnObjectWithCallback succeeds and rejects if functionOnObjectWithCallback errors
   *
   * Using this method may be less boilerplate than using {@link Promises#promisify}.
   *
   * Use this method when writing new functions that support both callbacks and Promises.
   *
   * @example
   * const promises = require("utiljs-promises");
   * const stream = require("stream");
   * const streams = require("utiljs-streams");
   * // stream#finished only takes a callback.
   * const readable = streams.fromString("Promise me, Hypnotoad!");
   * promises
   *   .promisifyAndCall(stream, stream.finished, readable)
   *   .then(() => console.log("Finished as promised"));
   *
   * @example
   * const promises = require("utiljs-promises");
   * function notify(message, callback) {
   *   if (!callback) return promises.promisifyAndCall(null, notify, message);
   *   callback(null, message);
   * }
   * notify("Call back, Hypnotoad!", (error, message) => console.log(message));
   * notify("Promise me, Hypnotoad!").then(console.log);
   *
   * @param {Object} object Value to use as this when executing functionOnObjectWithCallback (can be null)
   * @param {Function} functionOnObjectWithCallback A function that takes a callback as its last argument
   * @param {...*} args The arguments to pass to functionOnObjectWithCallback; this list of arguments should not contain a callback
   * @return {Promise} a new Promise instance
   * @public
   * @instance
   * @function
   */
  promisifyAndCall(object, functionOnObjectWithCallback, ...args) {
    return this.promisify(functionOnObjectWithCallback).apply(object, args);
  }

  /**
   * Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.
   *
   * See MDN's documentation about [race]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race}.
   *
   * There is one minor difference between Promise#race and this method. Promise#race only takes one argument that must be iterable. This method, Promises#race, behaves the same as Promise#race when given one argument; when given multiple arguments, [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments} becomes the iterable.
   *
   * @example
   * const promises = require("utiljs-promises");
   * const promise1 = new Promise((resolve, reject) => {
   *   setTimeout(resolve, 500, "one");
   * });
   * const promise2 = new Promise((resolve, reject) => {
   *   setTimeout(resolve, 100, "two");
   * });
   * promises.race(promise1, promise2).then(value => {
   *   console.log(value);
   *   // Both resolve, but promise2 is faster
   * });
   * // expected output: "two"
   *
   * @param {iterable|...*} iterable An iterable object such as an Array or String; if you give move than one argument to this method, [arguments]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments} becomes the iterable
   * @return {Promise} A pending Promise that resolves or rejects asynchronically (as soon as the stack is empty) as soon as one of the promises in the given iterable resolves or rejects, adopting that first promise's value as its value
   * @public
   * @instance
   * @function
   */
  race() {
    if (arguments.length > 1) return Promise.race(arguments);
    return Promise.race(...arguments);
  }

  /**
   * Returns a Promise object that is rejected with the given reason.
   *
   * See MDN's documentation about [reject]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject}.
   *
   * @param {*} reason Reason why this Promise rejected
   * @return {Promise} A Promise that is rejected with the given reason
   * @public
   * @instance
   * @function
   */
  reject() {
    return Promise.reject(...arguments);
  }

  /**
   * Returns a Promise object that is resolved with the given value.
   *
   * If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
   *
   * See MDN's documentation about [resolve]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve}.
   *
   * @param {*} value Argument to be resolved by this Promise that can also be a Promise or a thenable to resolve
   * @return {Promise} A Promise that is resolved with the given value, or the promise passed as value, if the value was a promise object
   * @public
   * @instance
   * @function
   */
  resolve() {
    return Promise.resolve(...arguments);
  }
}

module.exports = Promises;

const dependencies = {};

function arrays() {
  return (
    dependencies["utiljs-arrays"] ||
    (dependencies["utiljs-arrays"] = require("utiljs-arrays"))
  );
}

function hasCallback(args) {
  return args.length > 0 && typeof args[args.length - 1] === "function";
}
