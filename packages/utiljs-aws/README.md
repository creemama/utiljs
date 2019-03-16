# @util.js/aws

> JavaScript utility methods for the [AWS SDK](https://www.npmjs.com/package/aws-sdk)

<p>
  <a href="https://www.npmjs.com/package/@util.js/aws"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/aws.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/aws is part of [Util.js](https://github.com/creemama/utiljs).

## Modules

<dl>
<dt><a href="#module_S3Ext">S3Ext</a></dt>
<dd></dd>
<dt><a href="#module_AWSUtil">AWSUtil</a></dt>
<dd></dd>
</dl>

<a name="module_S3Ext"></a>

## S3Ext

| Param              | Type                  | Default                                             |
| ------------------ | --------------------- | --------------------------------------------------- |
| [options]          | <code>Object</code>   |                                                     |
| [options.promises] | <code>Promises</code> | <code>require(&quot;@util.js/promises&quot;)</code> |
| [options.s3]       | <code>AWS.S3</code>   |                                                     |

<a name="module_S3Ext+listAllObjectsV2"></a>

### s3Ext.listAllObjectsV2([params])

See [AWS.S3.listObjectsV2](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property).

**Kind**: instance method of [<code>S3Ext</code>](#module_S3Ext)

| Param                      | Type                |
| -------------------------- | ------------------- |
| [params]                   | <code>Object</code> |
| [params.Bucket]            | <code>String</code> |
| [params.Prefix]            | <code>String</code> |
| [params.ContinuationToken] | <code>String</code> |

<a name="module_AWSUtil"></a>

## AWSUtil

<a name="module_AWSUtil+S3Ext"></a>

### awsUtil.S3Ext

**Kind**: instance class of [<code>AWSUtil</code>](#module_AWSUtil)  
**See**: S3Ext
