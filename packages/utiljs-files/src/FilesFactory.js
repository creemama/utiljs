"use strict";

const Files = require("./Files");
const Resources = require("./FilesResources");

module.exports = function FilesFactory(options) {
  this.newFiles = function newFiles() {
    return new Files(new Resources(options));
  };
};
