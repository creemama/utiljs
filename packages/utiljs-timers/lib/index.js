"use strict";

const Timers = require("./Timers");
module.exports = new Timers([
  require("./schedule"),
  require("./setImmediatePromise"),
  require("./setTimeoutPromise"),
]);
