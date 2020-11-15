# @util.js/errors

> JavaScript utility methods for [errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

<p>
  <a href="https://www.npmjs.com/package/@util.js/errors"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/errors.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/errors is part of [Util.js](https://github.com/creemama/utiljs).

<a name="Errors"></a>

## Errors API

**Kind**: global class  
**Access**: public

- [Errors](#Errors)
  - [.AsyncError](#Errors+AsyncError)
    - [new AsyncError()](#new_Errors+AsyncError_new)
  - [.RethrownError](#Errors+RethrownError)
    - [new RethrownError(error, [message])](#new_Errors+RethrownError_new)
  - [.catch(promise, [message])](#Errors+catch) ⇒ <code>Promise</code>

<a name="Errors+AsyncError"></a>

### errors.AsyncError

**Kind**: instance class of [<code>Errors</code>](#Errors)  
**Access**: public  
<a name="new_Errors+AsyncError_new"></a>

#### new AsyncError()

An error that preserves the stack trace of the thread that calls an asynchronous function.

Use [catch](#Errors+catch) to use this class. Use this class directly for instanceof checks.

<a name="Errors+RethrownError"></a>

### errors.RethrownError

**Kind**: instance class of [<code>Errors</code>](#Errors)  
**Access**: public  
<a name="new_Errors+RethrownError_new"></a>

#### new RethrownError(error, [message])

A wrapper of another error used for rethrowing.

This error preserves information about the original error and its stack trace.

A [Stack Overflow](https://stackoverflow.com/questions/42754270/re-throwing-exception-in-nodejs-and-not-losing-stack-trace) article inspired this class.

**Throws**:

- <code>TypeError</code> if the given error is not defined

| Param     | Type                | Description                               |
| --------- | ------------------- | ----------------------------------------- |
| error     | <code>Error</code>  | The error to rethrow                      |
| [message] | <code>String</code> | A human-readable description of the error |

**Example**

```js
function throwATypeError() {
  throw new TypeError("Invalid Argument");
}

function rethrowTheTypeError() {
  try {
    throwATypeError();
  } catch (error) {
    throw new RethrownError(error, "Lorem Ipsum");
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

<a name="Errors+catch"></a>

### errors.catch(promise, [message]) ⇒ <code>Promise</code>

Wraps the given promise so that errors caught preserve the stack trace of the calling thread.

The example compares the stack trace of a rejected promise using this method and the stack trace of a rejected promise that does not use this method.

**Kind**: instance method of [<code>Errors</code>](#Errors)  
**Returns**: <code>Promise</code> - A promise that upon rejection wraps the error in an AsyncError and rethrows  
**Throws**:

- <code>TypeError</code> If the given promise is not an instance of Promise

**Access**: public

| Param     | Type                 | Description                               |
| --------- | -------------------- | ----------------------------------------- |
| promise   | <code>Promise</code> | The promise to wrap                       |
| [message] | <code>String</code>  | A human-readable description of the error |

**Example**

```js
const errors = require("@util.js/errors");
function rejectAPromise() {
  return Promise.reject(new TypeError("Fail!"));
}

errors
  .catch(rejectAPromise())
  .catch((error) => console.log("\n\nWith Caller Stack Trace\n" + error.stack));
// With Caller Stack Trace
// AsyncError: Fail!
//     at promise.catch.error (/root/utiljs/packages/utiljs-errors/lib/Errors.js:28:13)
//     at process._tickCallback (internal/process/next_tick.js:68:7)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:746:11)
//     at startup (internal/bootstrap/node.js:240:19)
//     at bootstrapNodeJSCore (internal/bootstrap/node.js:564:3)
//     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:23:11)
//     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
//     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
//     at Module._compile (internal/modules/cjs/loader.js:702:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
//     at Module.load (internal/modules/cjs/loader.js:612:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
// TypeError: Fail!
//     at rejectAPromise (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:20:27)
//     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:23:12)
//     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
//     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
//     at Module._compile (internal/modules/cjs/loader.js:702:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
//     at Module.load (internal/modules/cjs/loader.js:612:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)

rejectAPromise().catch((error) =>
  console.log("\n\nWithout Caller Stack Trace\n" + error.stack)
);
// Without Caller Stack Trace
// TypeError: Fail!
//     at rejectAPromise (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:20:27)
//     at runExample0 (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:53:3)
//     at runExample (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:12:7)
//     at Object.<anonymous> (/root/utiljs/packages/utiljs-errors/doc/README-examples.js:4:31)
//     at Module._compile (internal/modules/cjs/loader.js:702:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
//     at Module.load (internal/modules/cjs/loader.js:612:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:543:3)
//     at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
```
