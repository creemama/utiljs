"use strict";

const Privates = require("@util.js/privates");
const privates = new Privates();

function resources() {
  return {
    util: () => require("util")
  };
}

/**
 * An object to hold JavaScript timers: https://nodejs.org/api/timers.html
 * @exports Timers
 */
module.exports = class Timers {
  constructor() {
    privates.lazyLoadProps(this, resources());
  }

  get setImmediate() {
    return setImmediate;
  }

  get setImmediatePromise() {
    const thiz = privates.getCallProxy(this);
    return thiz.util.promisify(setImmediate);
  }

  get setInterval() {
    return setInterval;
  }

  get setTimeout() {
    return setTimeout;
  }

  get setTimeoutPromise() {
    const thiz = privates.getCallProxy(this);
    return thiz.util.promisify(setTimeout);
  }

  get clearImmediate() {
    return clearImmediate;
  }

  get clearInterval() {
    return clearInterval;
  }

  get clearTimeout() {
    return clearTimeout;
  }

  /**
   * Returns an asynchronous function that throttles the specified
   * functionToThrottle calling it once every limitInMilliseconds.
   *
   * @example
   * const timers = require("@util.js/timers");
   * let lastTime = Date.now();
   * function call(str) {
   *   console.log(str + ": " + (Date.now() - lastTime));
   *   lastTime = Date.now();
   * }
   * const throttledCall = timers.throttle(call, 2000);
   * throttledCall("a"); // should output "a: ~1".
   * throttledCall("b"); // should output "b: ~2000".
   * throttledCall("c"); // should output "c: ~2000".
   *
   * @param {Function} functionToThrottle The function to wrap
   * @param {Number} limitInMilliseconds The minimum amount of time between
   * calls to functionToThrottle; if this value cannot be coerced into a
   * number, then 0 is assumed
   * @return {Promise} A throttled version of functionToThrottle
   * @throws {TypeError} If functionToThrottle is not a function
   * @throws {TypeError} If limitInMilliseconds is a Symbol
   *
   * @alias module:Timers#throttle
   */
  throttle(functionToThrottle, limitInMilliseconds) {
    // This method was inspired by
    // https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf .

    if (typeof functionToThrottle !== "function")
      throw new TypeError(
        `functionToThrottle (${functionToThrottle}) must be a function.`
      );

    let lastRan;
    let executing = false;
    const t = this;
    const functions = [];
    let limit = Number(limitInMilliseconds);
    if (Number.isNaN(limit)) limit = 0;

    function execute(thiz, args, resolve, reject) {
      executing = true;
      try {
        const result = functionToThrottle.apply(thiz, args);
        resolve(result);
      } catch (e) {
        reject(e);
      }
      executing = false;
      return Date.now();
    }

    function recurse() {
      if (functions.length == 0) return;
      if (!executing && Date.now() - lastRan > limitInMilliseconds) {
        lastRan = execute.apply(null, functions.shift());
        if (functions.length >= 1) recurse();
      } else
        t.setTimeout(recurse, limitInMilliseconds - (Date.now() - lastRan));
    }

    return function() {
      const thiz = this;
      const args = arguments;

      return new Promise((resolve, reject) => {
        if (!executing && !lastRan) {
          lastRan = execute(thiz, args, resolve, reject);
          return;
        }
        functions.push([thiz, args, resolve, reject]);
        recurse();
      });
    };
  }
};
