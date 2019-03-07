"use strict";

class LernaResources {
  child_process() {
    return require("child_process");
  }
  console() {
    return console;
  }
  files() {
    return require("@util.js/files");
  }
  json() {
    return JSON;
  }
  numbers() {
    return require("@util.js/numbers");
  }
  objects() {
    return require("@util.js/objects");
  }
  process() {
    return process;
  }
  promises() {
    return require("@util.js/promises");
  }
  strings() {
    return require("@util.js/strings");
  }
}

module.exports = LernaResources;
