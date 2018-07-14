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
