# utiljs-objects

> JavaScript utility methods for [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

<p>
  <a href="https://www.npmjs.com/package/utiljs-objects"><img alt="NPM Status" src="https://img.shields.io/npm/v/utiljs-objects.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

utiljs-objects is part of [Util.js](https://github.com/creemama/utiljs).

This class contains all the non-instance methods of [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) in addition to:

- guarantee
- [isDefined](#Objects+isDefined)
- merge

<a name="Objects"></a>

## Objects

JavaScript utility methods for [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Kind**: global class  
**Access**: public  
<a name="Objects+isDefined"></a>

### objects.isDefined(object) ⇒ <code>Boolean</code>

Returns whether the specified obj is defined (i.e., not null and not undefined).

In other words, this method returns false if and only if the object is
null or undefined.

This method is useful when an expression like the following might return false when you expected true:

<pre><code>
if (x) console.log("x is defined.");
</code></pre>

This happens for [0, -0, NaN, false, and the empty string ("")](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean).

**Kind**: instance method of [<code>Objects</code>](#Objects)  
**Returns**: <code>Boolean</code> - true if the given object is defined or false otherwise  
**Access**: public

| Param  | Type            | Description         |
| ------ | --------------- | ------------------- |
| object | <code>\*</code> | The object to check |
