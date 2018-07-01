"use strict";

module.exports = function FilesResources(options) {
  const o = Object.assign({}, options);

  function get(resource) {
    return o[resource] ? o[resource] : (o[resource] = require(resource));
  }

  this.asyncwaterfall = function asyncwaterfall() {
    return get("async-waterfall");
  };
  this.child_process = function child_process() {
    return get("child_process");
  };
  this.fs = function fs() {
    return get("fs");
  };
  this.mkdirp = function mkdirp() {
    return get("mkdirp");
  };
  this.ncp = function ncp() {
    return get("ncp");
  };
  this.objects = function objects() {
    return get("utiljs-objects");
  };
  this.path = function path() {
    return get("path");
  };
  this.promises = function promises() {
    return get("utiljs-promises");
  };
  this.rimraf = function rimraf() {
    return get("rimraf");
  };
  this.strings = function strings() {
    return get("utiljs-strings");
  };
  this.touch = function touch() {
    return get("touch");
  };
};
