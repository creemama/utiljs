"use strict";

const Timers = require("./Timers");
module.exports = new Timers([
  require("./setImmediatePromise"),
  require("./setTimeoutPromise")
]);
