# @util.js/privates

> JavaScript utility class for private member variables

<p>
  <a href="https://www.npmjs.com/package/@util.js/privates"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/privates.svg?style=flat"></a>
</p>

@util.js/privates is part of [Util.js](https://github.com/creemama/utiljs).

<a name="Privates"></a>

## Privates

JavaScript utility class for private member variables.

This class decreases some of the boilerplate of the
[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
pattern as described by
["Private Variables in JavaScript with ES6 WeakMaps"](https://modernweb.com/private-variables-in-javascript-with-es6-weakmaps/)
and
["Privates In ES2015 Javascript Classes"](https://ilikekillnerds.com/2015/09/privates-in-es2015-javascript-classes/).
This utility handles shallow copying at construction.

Use of this class should end once private fields become a part of the ECMA
standard. The following is a StackOverflow answer to the question
["Private properties in JavaScript ES6 classes"](https://stackoverflow.com/a/52237988):
"Private fields are being implemented in the ECMA standard. You can start
using them today with babel 7 and stage 3 preset."

**Kind**: global class  
**Access**: public
