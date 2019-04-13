"use strict";

module.exports = {
  dependencies: {
    util: () => require("util")
  },
  function: wrap,
  name: "setImmediatePromise"
};

function wrap(thiz) {
  return thiz.util.promisify(setImmediate);
}
