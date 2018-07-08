"use strict";

module.exports = StringsResources;

/**
 * Manager of the external dependencies for the {@link Strings} utility class
 * @protected
 * @class
 */
function StringsResources() {
  const o = {};

  function get(resource) {
    return o[resource] || (o[resource] = require(resource));
  }

  /**
   * Returns {@link https://www.npmjs.com/package/base64url|base64url}
   * @protected
   * @function
   */
  this.base64url = function base64url() {
    return get("base64url");
  };
}
