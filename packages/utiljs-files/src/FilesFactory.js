"use strict";

const Files = require(__dirname + "/Files");
const Resources = require(__dirname + "/FilesResources");

module.exports = function FilesFactory(options) {
  this.newFiles = function newFiles() {
    return new Files(new Resources(options));
  };
};
