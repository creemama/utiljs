"use strict";

module.exports = {
  dependencies: {
    util: () => require("util"),
  },
  function: wrap,
  name: "setTimeoutPromise",
};

function wrap(thiz) {
  return thiz.util.promisify(setTimeout);
}
