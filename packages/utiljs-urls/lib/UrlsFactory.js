"use strict";

const Resources = require("./UrlsResources"),
  Urls = require("./Urls");

module.exports = function UrlsFactory(options) {
  this.newUrls = function newUrls() {
    return new Urls(new Resources(options));
  };
};
