"use strict";

const Resources = require(__dirname + "/UrlsResources"),
  Urls = require(__dirname + "/Urls");

module.exports = function UrlsFactory(options) {
  this.newUrls = function newUrls() {
    return new Urls(new Resources(options));
  };
};
