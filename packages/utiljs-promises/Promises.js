"use strict";

module.exports = function Promises() {
  this.all = Promise.all;
  this.race = Promise.race;
  this.reject = Promise.reject;
  this.resolve = Promise.resolve;

  this.promisify = promisify;
  this.promisifyAndCall = promisifyAndCall;

  function promisify(functionWithCallback) {
    return function() {
      const args = arguments;
      const thiz = this;
      return new Promise((resolve, reject) => {
        try {
          functionWithCallback.call(thiz, ...args, function(err) {
            if (err) return reject(err);
            if (arguments.length == 1) return resolve.call(null);
            if (arguments.length == 2) return resolve.call(null, arguments[1]);
            const callbackArguments = Array.from(arguments);
            callbackArguments.shift(); // remove the first element
            resolve.call(null, callbackArguments);
          });
        } catch (e) {
          reject(e);
        }
      });
    };
  }

  function promisifyAndCall(object, functionOnObjectWithCallback, ...args) {
    return promisify(functionOnObjectWithCallback).apply(object, args);
  }
};
