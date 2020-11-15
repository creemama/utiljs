# @util.js/jquery

> JavaScript utility methods for [jQuery](https://jquery.com/)

<p>
  <a href="https://www.npmjs.com/package/@util.js/jquery"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/jquery.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

@util.js/jquery is part of [Util.js](https://github.com/creemama/utiljs).

<a name="JQueryUtils"></a>

## JQueryUtils API

**Kind**: global class  
**Access**: public  
<a name="JQueryUtils+loadjQuery"></a>

### jQueryUtils.loadjQuery(params, [callback]) ⇒ <code>undefined</code> \| <code>Promise</code>

Loads jQuery asynchronously and sends a notification when loading has finished

**Kind**: instance method of [<code>JQueryUtils</code>](#JQueryUtils)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if a callback is specified or a Promise that returns jQuery once jQuery has finished loading  
**Throws**:

- <code>Error</code> If params is undefined, null, or params has an invalid window object

**Access**: public

| Param         | Type                  | Default                                                                                   | Description                                                    |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| params        | <code>Object</code>   |                                                                                           |                                                                |
| [params.src]  | <code>string</code>   | <code>&quot;https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js&quot;</code> | The jQuery script to load                                      |
| params.window | <code>Window</code>   |                                                                                           | The browser's window                                           |
| [callback]    | <code>function</code> |                                                                                           | A callback function that takes two arguments: error and jQuery |

**Example**

```js
const jQueryUtils = require("@util.js/jquery");
jQueryUtils
  .loadjQuery({ window })
  .then(($) => console.log($))
  .catch(console.log);
```

**Example**

```js
const jQueryUtils = require("@util.js/jquery");
jQueryUtils
  .loadjQuery({
    src: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    window,
  })
  .then(($) => console.log($))
  .catch(console.log);
```

**Example**

```js
const jQueryUtils = require("@util.js/jquery");
jQueryUtils.loadjQuery({ window }, (error, $) => {
  if (error) return console.log(error);
  console.log($);
});
```
