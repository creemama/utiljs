# utiljs-errors

> JavaScript utility methods for [errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

<p>
  <a href="https://www.npmjs.com/package/utiljs-errors"><img alt="NPM Status" src="https://img.shields.io/npm/v/utiljs-errors.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

utiljs-errors is part of [Util.js](https://github.com/creemama/utiljs).

<a name="Errors"></a>

## Errors API

**Kind**: global class  
**Access**: public

- [Errors](#Errors)
  - [.RethrownError](#Errors+RethrownError)
    - [new Errors#RethrownError()](#new_Errors+RethrownError_new)

<a name="Errors+RethrownError"></a>

### errors.RethrownError

**Kind**: instance class of [<code>Errors</code>](#Errors)  
**Access**: public  
<a name="new_Errors+RethrownError_new"></a>

#### new Errors#RethrownError()

A wrapper of another error used for rethrowing.

This error preserves information about the original error and its stack trace.

A [Stack Overflow](https://stackoverflow.com/questions/42754270/re-throwing-exception-in-nodejs-and-not-losing-stack-trace) article inspired this class.

**Example**

```js
function throwATypeError() {
  throw new TypeError("Invalid Argument");
}

function rethrowTheTypeError() {
  try {
    throwATypeError();
  } catch (error) {
    throw new RethrownError("Lorem Ipsum", error);
  }
}

try {
  rethrowTheTypeError();
} catch (error) {
  console.log(error.stack);
  // This outputs a stack trace like the following:
  //
  // RethrownError: Lorem Ipsum
  //     at rethrowTheTypeError (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:16:15)
  // TypeError: Invalid Argument
  //     at throwATypeError (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:10:13)
  //     at rethrowTheTypeError (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:14:9)
  //     at Context.it (/root/utiljs/packages/utiljs-errors/test/ErrorsTest.js:20:7)
  //     ...
}
```
