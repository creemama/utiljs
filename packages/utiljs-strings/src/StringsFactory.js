"use strict";

const Resources = require(__dirname + "/StringsResources");
const Strings = require(__dirname + "/Strings");

module.exports = StringsFactory;

function StringsFactory() {
  this.newStrings = newStrings;

  function newStrings() {
    return new Strings({ base64url: newResources().base64url() });
  }

  function newResources() {
    return new Resources();
  }
}
