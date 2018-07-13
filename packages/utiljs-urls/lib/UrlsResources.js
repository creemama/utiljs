"use strict";

module.exports = function TasksResources(options) {
  const o = Object.assign({}, options);

  function get(resource) {
    return o[resource] ? o[resource] : (o[resource] = require(resource));
  }

  // Node.js objects
  this.http = function http() {
    return get("http");
  };
  this.https = function https() {
    return get("https");
  };
  this.url = function url() {
    return get("url");
  };

  // UtilJS support objects
  this.files = function files() {
    return get("utiljs-files");
  };
  this.promises = function promises() {
    return get("utiljs-promises");
  };
};
