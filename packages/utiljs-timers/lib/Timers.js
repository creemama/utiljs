"use strict";

class Timers {
  get setImmediate() {
    return setImmediate;
  }

  get setImmediatePromise() {
    return util().promisify(setImmediate);
  }

  get setInterval() {
    return setInterval;
  }

  get setTimeout() {
    return setTimeout;
  }

  get setTimeoutPromise() {
    return util().promisify(setTimeout);
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
}

module.exports = Timers;

const dependencies = {};
function get(dependency) {
  return (
    dependencies[dependency] || (dependencies[dependency] = require(dependency))
  );
}

function util() {
  return get("util");
}
