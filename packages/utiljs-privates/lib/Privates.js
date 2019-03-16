"use strict";

/**
 * JavaScript utility class for private member variables.
 *
 * This class decreases some of the boilerplate of the
 * [WeakMap]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap}
 * pattern as described by
 * ["Private Variables in JavaScript with ES6 WeakMaps"]{@link https://modernweb.com/private-variables-in-javascript-with-es6-weakmaps/}
 * and
 * ["Privates In ES2015 Javascript Classes"]{@link https://ilikekillnerds.com/2015/09/privates-in-es2015-javascript-classes/}.
 * This utility handles shallow copying at construction.
 *
 * Private fields may become a part of the ECMA standard. The following is a
 * StackOverflow answer to the question
 * ["Private properties in JavaScript ES6 classes"]{@link https://stackoverflow.com/a/52237988}:
 * "Private fields are being implemented in the ECMA standard. You can start
 * using them today with babel 7 and stage 3 preset." Wouldn't private fields
 * make this class obsolete? Not necessarily. If each of your privates is a
 * function (e.g., you want to lazy load all member variables), this class has
 * convenience methods for that.
 *
 * @public
 * @class
 */
class Privates {
  constructor() {
    this.privates = new WeakMap();
  }

  call(thiz, privatePart) {
    // this.get(thiz, privatePart)() does not work all the time unless we
    // call bind, which we do in the set method. See
    // https://javascript.info/object-methods.
    return this.get(thiz, privatePart)();
  }

  get(thiz, privatePart) {
    if (!thiz)
      throw new Error(
        `thiz cannot be falsy when trying to get ${privatePart}.`
      );
    return this.privates.get(thiz)[privatePart];
  }

  require(thiz, privatePart) {
    return (
      this.get(thiz, privatePart) ||
      (this.privates.get(thiz)[privatePart] = require(privatePart))
    );
  }

  lazyLoad(thiz, lazyMap) {
    const lazy = {};
    const obj = {};
    Object.entries(lazyMap).forEach(([prop, lazyLoadFunction]) => {
      lazy[prop] = () => {
        return obj[prop] ? obj[prop] : (obj[prop] = lazyLoadFunction());
      };
    });
    this.set(thiz, lazy);
  }

  set(thiz, options) {
    let thizPrivates;
    if (!options) {
      thizPrivates = {};
    } else {
      thizPrivates = Object.assign({}, options);
      const methods = getAllMethods(options);
      for (let i = 0; i < methods.length; i++) {
        thizPrivates[methods[i]] = options[methods[i]].bind(options);
      }
    }
    this.privates.set(thiz, thizPrivates);
  }

  subset(thiz, ...privateParts) {
    const object = {};
    for (let i = 0; i < privateParts.length; i++)
      object[privateParts[i]] = this.get(thiz, privateParts[i]);
    return object;
  }
}

// https://stackoverflow.com/questions/31054910/get-functions-methods-of-a-class
function getAllMethods(obj) {
  if (!Object.getPrototypeOf(obj)) return [];

  let props = [];

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter(
        (p, i, arr) =>
          typeof obj[p] === "function" && // only the methods
          p !== "constructor" && // not the constructor
          (i == 0 || p !== arr[i - 1]) && // not overriding in this prototype
          props.indexOf(p) === -1 // not overridden in a child
      );
    props = props.concat(l);
  } while (
    (obj = Object.getPrototypeOf(obj)) && // walk-up the prototype chain
    Object.getPrototypeOf(obj) // not the the Object prototype methods (hasOwnProperty, etc...)
  );

  return props;
}

module.exports = Privates;
