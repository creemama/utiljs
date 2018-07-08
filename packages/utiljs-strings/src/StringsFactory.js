"use strict";

const Resources = require(__dirname + "/StringsResources");
const Strings = require(__dirname + "/Strings");

module.exports = StringsFactory;

/**
 * Factory that creates instances of the {@link Strings} utility class
 * @protected
 * @class
 */
function StringsFactory() {
  /**
   * Creates instances of the {@link Strings} utility class
   * @protected
   * @function
   */
  this.newStrings = newStrings;

  function newStrings() {
    return new Strings(new Resources());
  }
}
