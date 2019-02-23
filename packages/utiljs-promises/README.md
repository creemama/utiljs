# @util.js/promises

> JavaScript utility methods for [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<p>
  <a href="https://www.npmjs.com/package/@util.js/promises"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/promises.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/promises is part of [Util.js](https://github.com/creemama/utiljs).

This class contains all the non-instance methods of [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) in addition to:

- [applyCallback](#Promises+applyCallback)
- [applyPromise](#Promises+applyPromise)
- [callbackify](#Promises+callbackify)
- [callCallback](#Promises+callCallback)
- [callPromise](#Promises+callPromise)
- [promisify](#Promises+promisify)

[Promises#all](#Promises+all) and [Promises#race](#Promises+race) behave a little differently from Promise#all and Promise#race. Unlike Promise#all and Promise#race, Promises#all and Promises#race can take multiple arguments.

<a name="Promises"></a>

## Promises API

**Kind**: global class  
**Access**: public

- [Promises](#Promises)
  - [.all(iterable)](#Promises+all) ⇒ <code>Promise</code>
  - [.applyCallback(object, functionOnObjectWithCallback, args)](#Promises+applyCallback) ⇒ <code>undefined</code> \| <code>Promise</code>
  - [.applyPromise(object, promiseFunctionOnObject, args)](#Promises+applyPromise) ⇒ <code>undefined</code> \| <code>Promise</code>
  - [.callbackify(promiseFunction)](#Promises+callbackify) ⇒ <code>function</code>
  - [.callCallback(object, functionOnObjectWithCallback, [...args])](#Promises+callCallback) ⇒ <code>undefined</code> \| <code>Promise</code>
  - [.callPromise(object, promiseFunctionOnObject, [...args])](#Promises+callPromise) ⇒ <code>undefined</code> \| <code>Promise</code>
  - [.promisify(functionWithCallback)](#Promises+promisify) ⇒ <code>function</code>
  - [.race(iterable)](#Promises+race) ⇒ <code>Promise</code>
  - [.reject(reason)](#Promises+reject) ⇒ <code>Promise</code>
  - [.resolve(value)](#Promises+resolve) ⇒ <code>Promise</code>

<a name="Promises+all"></a>

### promises.all(iterable) ⇒ <code>Promise</code>

Returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises.

It rejects with the reason of the first promise that rejects.

See MDN's documentation about [all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

There is one minor difference between Promise#all and this method. Promise#all only takes one argument that must be iterable. This method, Promises#all, behaves the same as Promise#all when given one argument; when given multiple arguments, [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) becomes the iterable.

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>Promise</code> - (A) An already resolved Promise if the iterable passed is empty.
(B) An asynchronously resolved Promise if the iterable passed contains no promises.
(C) A pending Promise in all other cases; this returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when all the promises in the given iterable have resolved, or if any of the promises reject; returned values will be in order of the Promises passed, regardless of completion order.  
**Access**: public

| Param    | Type                                     | Description                                                                                                                                                                                                               |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iterable | <code>iterable</code> \| <code>\*</code> | An iterable object such as an Array or String; if you give move than one argument to this method, [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) becomes the iterable |

**Example**

```js
const promises = require("@util.js/promises");
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
promises.all(promise1, promise2, promise3).then(values => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

<a name="Promises+applyCallback"></a>

### promises.applyCallback(object, functionOnObjectWithCallback, args) ⇒ <code>undefined</code> \| <code>Promise</code>

Calls the given functionOnObjectWithCallback with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.

Use this function if you are wrapping an existing function that only takes a callback but would like that function to handle both callbacks and Promises.

It is also useful in writing new functions where you would like to support both callbacks and Promises.

This function adapts functions that accept a callback. [applyPromise](#Promises+applyPromise) adapts functions that return a Promise.

This function is similar to Function#apply. It accepts a single array of arguments.

Function#call and [callCallback](#Promises+callCallback) accept an argument list.

When trying to remember the difference between #apply and #call, think, "#apply accepts an array. Both array and #apply start with a."

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if the last element of args is a callback or a Promise if args does not contain a callback  
**Throws**:

- <code>TypeError</code> If functionOnObjectWithCallback is not a function or if args is null or undefined

**Access**: public

| Param                        | Type                  | Description                                                                                                                                                                                                    |
| ---------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object                       | <code>Object</code>   | Value to use as this when executing functionOnObjectWithCallback (can be null)                                                                                                                                 |
| functionOnObjectWithCallback | <code>function</code> | A function that takes a callback as its last argument                                                                                                                                                          |
| args                         |                       | An array-like object containing the arguments to pass to functionOnObjectWithCallback; this is usually just [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) |

**Example**

```js
// Wrap a function that only accepts a callback.
const promises = require("@util.js/promises");
const stream = require("stream");
const streams = require("@util.js/streams");
// stream#finished only takes a callback.
// Wrap stream#finished so that it handles both callbacks and Promises.
function finished() {
  return promises.applyCallback(stream, stream.finished, arguments);
}
const readableToCallback = streams.fromString("Call back, Hypnotoad!");
finished(readableToCallback, () => console.log("Finished with a callback"));
const readableToPromise = streams.fromString("Promise me, Hypnotoad!");
finished(readableToPromise).then(() => console.log("Finished as promised"));
```

**Example**

```js
// Write a function that supports both callbacks and Promises.
const promises = require("@util.js/promises");
function notify(message, who, callback) {
  if (!callback) return promises.applyCallback(null, notify, arguments);
  callback(null, `${message}, ${who}!`);
}
notify("Call back", "Hypnotoad", (error, message) => console.log(message));
notify("Promise me", "Hypnotoad").then(console.log);
```

<a name="Promises+applyPromise"></a>

### promises.applyPromise(object, promiseFunctionOnObject, args) ⇒ <code>undefined</code> \| <code>Promise</code>

Calls the given promiseFunctionOnObject with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.

Use this function if you are wrapping an existing function that only returns a Promise but would like that function to handle both callbacks and Promises.

It is also useful in writing new functions where you would like to support both callbacks and Promises.

This function adapts functions that return a Promise. [applyCallback](#Promises+applyCallback) adapts functions that accept a callback.

This function is similar to Function#apply. It accepts a single array of arguments.

Function#call and [callPromise](#Promises+callPromise) accept an argument list.

When trying to remember the difference between #apply and #call, think, "#apply accepts an array. Both array and #apply start with a."

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if the last element of args is a callback or a Promise if args does not contain a callback  
**Throws**:

- <code>TypeError</code> If promiseFunctionOnObject is not a function or if args is null or undefined

**Access**: public

| Param                   | Type                  | Description                                                                                                                                                                                               |
| ----------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object                  | <code>Object</code>   | Value to use as this when executing promiseFunctionOnObject (can be null)                                                                                                                                 |
| promiseFunctionOnObject | <code>function</code> | A function that returns a Promise                                                                                                                                                                         |
| args                    |                       | An array-like object containing the arguments to pass to promiseFunctionOnObject; this is usually just [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) |

**Example**

```js
// Wrap a function that only returns a Promise.
const promises = require("@util.js/promises");
function notifyPromise(message, who) {
  return promises.resolve(`${message}, ${who}!`);
}
// #notifyPromise only returns a Promise.
// Wrap #notifyPromise so that it handles both callbacks and Promises.
function notify(message, who, callback) {
  return promises.applyPromise(null, notifyPromise, arguments);
}
notify("Call back", "Hypnotoad", (error, message) => console.log(message));
notify("Promise me", "Hypnotoad").then(console.log);
```

**Example**

```js
// Write a function that supports both callbacks and Promises.
const promises = require("@util.js/promises");
function notify(message, who, callback) {
  if (callback) return promises.applyPromise(null, notify, arguments);
  return promises.resolve(`${message}, ${who}!`);
}
notify("Call back", "Hypnotoad", (error, message) => console.log(message));
notify("Promise me", "Hypnotoad").then(console.log);
```

<a name="Promises+callbackify"></a>

### promises.callbackify(promiseFunction) ⇒ <code>function</code>

Wraps the given promiseFunction such that calling the returned function with a callback notifies the callback with an error if promiseFunction rejects or the return value if promiseFunction resolves.

Use [callPromise](#Promises+callPromise) if you would like to callbackify a method and call it in one line.

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>function</code> - A function that accepts a callback  
**Throws**:

- <code>TypeError</code> If promiseFunction is not a function

**Access**: public

| Param           | Type                  | Description                       |
| --------------- | --------------------- | --------------------------------- |
| promiseFunction | <code>function</code> | A function that returns a Promise |

**Example**

```js
const promises = require("@util.js/promises");
function notifyPromise(message, who) {
  return promises.resolve(`${message}, ${who}!`);
}
// #notifyPromise only returns a Promise.
// Wrap #notifyPromise so that it accepts a callback.
const notify = promises.callbackify(notifyPromise);
notify("Call back", "Hypnotoad", (error, message) => console.log(message));
```

<a name="Promises+callCallback"></a>

### promises.callCallback(object, functionOnObjectWithCallback, [...args]) ⇒ <code>undefined</code> \| <code>Promise</code>

Calls the given functionOnObjectWithCallback with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.

This method just calls:

<pre><code>
this.applyCallback(object, functionOnObjectWithCallback, args)
</code></pre>

See [applyCallback](#Promises+applyCallback).

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if the last element of args is a callback or a Promise if args does not contain a callback  
**Throws**:

- <code>TypeError</code> If functionOnObjectWithCallback is not a function

**Access**: public

| Param                        | Type                  | Description                                                                      |
| ---------------------------- | --------------------- | -------------------------------------------------------------------------------- |
| object                       | <code>Object</code>   | Value to use as this when executing functionOnObjectWithCallback (can be null)   |
| functionOnObjectWithCallback | <code>function</code> | A function that takes a callback as its last argument                            |
| [...args]                    | <code>\*</code>       | The arguments to pass to functionOnObjectWithCallback or its promisified version |

**Example**

```js
const promises = require("@util.js/promises");
function notifyCallback(message, who, callback) {
  callback(null, `${message}, ${who}!`);
}
// #notifyCallback only accpets a callback.
// Force #notifyCallback to return a Promise.
promises
  .callCallback(null, notifyCallback, "Promise me", "Hypnotoad")
  .then(console.log);
```

<a name="Promises+callPromise"></a>

### promises.callPromise(object, promiseFunctionOnObject, [...args]) ⇒ <code>undefined</code> \| <code>Promise</code>

Calls the given promiseFunctionOnObject with the given args that either (A) returns a Promise if args does not contain a callback or (B) notifies the callback if args contains a callback.

This method just calls:

<pre><code>
this.applyCallback(object, functionOnObjectWithCallback, args)
</code></pre>

See [applyPromise](#Promises+applyPromise).

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if the last element of args is a callback or a Promise if args does not contain a callback  
**Throws**:

- <code>TypeError</code> If promiseFunctionOnObject is not a function

**Access**: public

| Param                   | Type                  | Description                                                                   |
| ----------------------- | --------------------- | ----------------------------------------------------------------------------- |
| object                  | <code>Object</code>   | Value to use as this when executing promiseFunctionOnObject (can be null)     |
| promiseFunctionOnObject | <code>function</code> | A function that returns a Promise                                             |
| [...args]               | <code>\*</code>       | The arguments to pass to promiseFunctionOnObject or its callbackified version |

**Example**

```js
const promises = require("@util.js/promises");
function notifyPromise(message, who) {
  return promises.resolve(`${message}, ${who}!`);
}
// #notifyPromise only returns a Promise.
// Force #notifyPromise to accept a callback.
promises.callPromise(
  null,
  notifyPromise,
  "Call back",
  "Hypnotoad",
  (error, message) => console.log(message)
);
```

<a name="Promises+promisify"></a>

### promises.promisify(functionWithCallback) ⇒ <code>function</code>

Wraps the given functionWithCallback such that calling the returned function returns a Promise that resolves if functionWithCallback succeeds and rejects if functionWithCallback errors.

Use [callCallback](#Promises+callCallback) if you would like to promisify a method and call it in one line.

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>function</code> - A function that returns a Promise  
**Throws**:

- <code>TypeError</code> If functionWithCallback is not a function

**Access**: public

| Param                | Type                  | Description                                           |
| -------------------- | --------------------- | ----------------------------------------------------- |
| functionWithCallback | <code>function</code> | A function that takes a callback as its last argument |

**Example**

```js
const promises = require("@util.js/promises");
const stream = require("stream");
const streams = require("@util.js/streams");
// stream#finished only takes a callback.
// Let us wrap stream#finished so that it returns a Promise.
const readable = streams.fromString("Promise me, Hypnotoad!");
const finished = promises.promisify(stream.finished);
finished(readable).then(() => console.log("Finished as promised"));
```

<a name="Promises+race"></a>

### promises.race(iterable) ⇒ <code>Promise</code>

Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.

See MDN's documentation about [race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

There is one minor difference between Promise#race and this method. Promise#race only takes one argument that must be iterable. This method, Promises#race, behaves the same as Promise#race when given one argument; when given multiple arguments, [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) becomes the iterable.

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>Promise</code> - A pending Promise that resolves or rejects asynchronically (as soon as the stack is empty) as soon as one of the promises in the given iterable resolves or rejects, adopting that first promise's value as its value  
**Access**: public

| Param    | Type                                     | Description                                                                                                                                                                                                               |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iterable | <code>iterable</code> \| <code>\*</code> | An iterable object such as an Array or String; if you give move than one argument to this method, [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) becomes the iterable |

**Example**

```js
const promises = require("@util.js/promises");
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});
promises.race(promise1, promise2).then(value => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```

<a name="Promises+reject"></a>

### promises.reject(reason) ⇒ <code>Promise</code>

Returns a Promise object that is rejected with the given reason.

See MDN's documentation about [reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject).

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>Promise</code> - A Promise that is rejected with the given reason  
**Access**: public

| Param  | Type            | Description                      |
| ------ | --------------- | -------------------------------- |
| reason | <code>\*</code> | Reason why this Promise rejected |

<a name="Promises+resolve"></a>

### promises.resolve(value) ⇒ <code>Promise</code>

Returns a Promise object that is resolved with the given value.

If the value is a promise, that promise is returned; if the value is a thenable (i.e. has a "then" method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.

See MDN's documentation about [resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve).

**Kind**: instance method of [<code>Promises</code>](#Promises)  
**Returns**: <code>Promise</code> - A Promise that is resolved with the given value, or the promise passed as value, if the value was a promise object  
**Access**: public

| Param | Type            | Description                                                                                 |
| ----- | --------------- | ------------------------------------------------------------------------------------------- |
| value | <code>\*</code> | Argument to be resolved by this Promise that can also be a Promise or a thenable to resolve |
