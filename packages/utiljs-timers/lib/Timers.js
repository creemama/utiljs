"use strict";

const Privates = require("@util.js/privates");
const privates = new Privates();

function resources() {
  return {
    util: () => require("util")
  };
}

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
};
