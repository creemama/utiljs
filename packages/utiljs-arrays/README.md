# @util.js/arrays

> JavaScript utility methods for [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

<p>
  <a href="https://www.npmjs.com/package/@util.js/arrays"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/arrays.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/arrays is part of [Util.js](https://github.com/creemama/utiljs).

This class contains all the non-instance methods of [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) in addition to:

- [shuffle](#Arrays+shuffle)

<a name="Arrays"></a>

## Arrays API

**Kind**: global class  
**Access**: public

- [Arrays](#Arrays)
  - [.from(arrayLike, [mapFn], [thisArg])](#Arrays+from) ⇒ <code>Array</code>
  - [.isArray(obj)](#Arrays+isArray) ⇒ <code>boolean</code>
  - [.of(...elementN)](#Arrays+of) ⇒ <code>Array</code>
  - [.shuffle(array)](#Arrays+shuffle) ⇒ <code>Array</code>

<a name="Arrays+from"></a>

### arrays.from(arrayLike, [mapFn], [thisArg]) ⇒ <code>Array</code>

Creates a new, shallow-copied Array instance from an array-like or iterable object.

See MDN's documentation about [from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

**Kind**: instance method of [<code>Arrays</code>](#Arrays)  
**Returns**: <code>Array</code> - A new Array instance  
**Access**: public

| Param     | Type                  | Description                                             |
| --------- | --------------------- | ------------------------------------------------------- |
| arrayLike |                       | An array-like or iterable object to convert to an array |
| [mapFn]   | <code>function</code> | Map function to call on every element of the array      |
| [thisArg] | <code>Object</code>   | Value to use as this when executing mapFn               |

<a name="Arrays+isArray"></a>

### arrays.isArray(obj) ⇒ <code>boolean</code>

Determines whether the passed value is an Array.

See MDN's documentation about [isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray).

**Kind**: instance method of [<code>Arrays</code>](#Arrays)  
**Returns**: <code>boolean</code> - true if the object is an Array or false otherwise  
**Access**: public

| Param | Type            | Description              |
| ----- | --------------- | ------------------------ |
| obj   | <code>\*</code> | The object to be checked |

<a name="Arrays+of"></a>

### arrays.of(...elementN) ⇒ <code>Array</code>

Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments

See MDN's documentation about [of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of).

**Kind**: instance method of [<code>Arrays</code>](#Arrays)  
**Returns**: <code>Array</code> - A new Array instance  
**Access**: public

| Param       | Type            | Description                           |
| ----------- | --------------- | ------------------------------------- |
| ...elementN | <code>\*</code> | Elements of which to create the array |

<a name="Arrays+shuffle"></a>

### arrays.shuffle(array) ⇒ <code>Array</code>

Shuffles the elements of the specified array.

See [knuth-shuffle](https://www.npmjs.com/package/knuth-shuffle).

**Kind**: instance method of [<code>Arrays</code>](#Arrays)  
**Returns**: <code>Array</code> - A new Array instance  
**Access**: public

| Param | Type               | Description          |
| ----- | ------------------ | -------------------- |
| array | <code>Array</code> | The array to shuffle |
