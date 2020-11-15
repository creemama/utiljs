"use strict";

const Privates = require("@util.js/privates");

function resources() {
  return {
    promises: () => require("@util.js/promises"),
  };
}

/**
 * Additional utility methods for AWS.S3
 * @exports S3Ext
 */
module.exports = class S3Ext {
  /**
   * @param {Object} [options]
   * @param {Promises} [options.promises=require("@util.js/promises")]
   * @param {AWS.S3} [options.s3]
   */
  constructor(options) {
    privates.lazyLoadProps(this, resources(), privates.lambdaize(options));
  }

  /**
   * See [AWS.S3.listObjectsV2](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property).
   *
   * @param {Object} [params]
   * @param {String} [params.Bucket]
   * @param {String} [params.Prefix]
   * @param {String} [params.ContinuationToken]
   *
   * @alias module:S3Ext#listAllObjectsV2
   */
  listAllObjectsV2(params, callback) {
    const thiz = privates.getCallProxy(this);
    if (!callback)
      return thiz.promises.applyCallback(
        this,
        this.listAllObjectsV2,
        arguments
      );
    const { Bucket, ContinuationToken, Objects, Prefix } = params;
    thiz.s3.listObjectsV2(
      {
        Bucket,
        ContinuationToken,
        Prefix,
      },
      (error, data) => {
        if (error) {
          callback(error);
          return;
        }
        let newObjects = Objects
          ? Objects.concat(data.Contents)
          : data.Contents;
        let newContinuationToken =
          data.NextContinuationToken || data.ContinuationToken;
        if (
          newContinuationToken &&
          !(ContinuationToken == newContinuationToken)
        ) {
          this.listAllObjectsV2(
            {
              Bucket,
              ContinuationToken: newContinuationToken,
              Objects: newObjects,
              Prefix,
            },
            callback
          );
        } else callback(null, newObjects);
      }
    );
  }
};

const privates = new Privates();
