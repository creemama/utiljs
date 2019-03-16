"use strict";

/**
 * JavaScript utility methods for the [AWS SDK](https://www.npmjs.com/package/aws-sdk)
 * @exports AWSUtil
 */
module.exports = class AWSUtil {
  /**
   * @alias module:AWSUtil#S3Ext
   * @class
   * @see S3Ext
   */
  get S3Ext() {
    return require("./S3Ext");
  }
};
