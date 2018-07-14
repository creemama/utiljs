"use strict";

class Promises {
  all() {
    return Promise.all(...arguments);
  }

  call(object, functionOnObjectWithCallback, args) {
    if (hasCallback(args))
      return functionOnObjectWithCallback.apply(object, args);
    return this.promisifyAndCall(object, functionOnObjectWithCallback, ...args);
  }

  promisify(functionWithCallback) {
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

  promisifyAndCall(object, functionOnObjectWithCallback, ...args) {
    return this.promisify(functionOnObjectWithCallback).apply(object, args);
  }

  race() {
    return Promise.race(...arguments);
  }

  reject() {
    return Promise.reject(...arguments);
  }

  resolve() {
    return Promise.resolve(...arguments);
  }
}

module.exports = Promises;

function hasCallback(args) {
  return args.length > 0 && typeof args[args.length - 1] === "function";
}
