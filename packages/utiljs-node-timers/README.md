# @util.js/node-timers

> An object to hold JavaScript timers: https://nodejs.org/api/timers.html

<p>
  <a href="https://www.npmjs.com/package/@util.js/node-timers"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-timers.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/node-timers is part of [Util.js](https://github.com/creemama/utiljs).

<a name="module_Timers"></a>

## Timers

<a name="module_Timers+throttle"></a>

### timers.throttle(functionToThrottle, limitInMilliseconds) ⇒ <code>Promise</code>

Returns an asynchronous function that throttles the specified
functionToThrottle calling it once every limitInMilliseconds.

**Kind**: instance method of [<code>Timers</code>](#module_Timers)  
**Returns**: <code>Promise</code> - A throttled version of functionToThrottle  
**Throws**:

- <code>TypeError</code> If functionToThrottle is not a function
- <code>TypeError</code> If limitInMilliseconds is a Symbol

| Param               | Type                  | Description                                                                                                                      |
| ------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| functionToThrottle  | <code>function</code> | The function to wrap                                                                                                             |
| limitInMilliseconds | <code>Number</code>   | The minimum amount of time between calls to functionToThrottle; if this value cannot be coerced into a number, then 0 is assumed |

**Example**

```js
const timers = require("@util.js/node-timers");
let lastTime = Date.now();
function call(str) {
  console.log(str + ": " + (Date.now() - lastTime));
  lastTime = Date.now();
}
const throttledCall = timers.throttle(call, 2000);
throttledCall("a"); // should output "a: ~1".
throttledCall("b"); // should output "b: ~2000".
throttledCall("c"); // should output "c: ~2000".
```
