"use strict";

const { RethrownError } = require("@util.js/errors");

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

  /**
   * Calls `this.get(thiz, property)()`.
   */
  call(thiz, property) {
    try {
      // this.get(thiz, property)() does not work all the time unless we
      // call bind, which we do in the set method. See
      // https://javascript.info/object-methods.
      return this.get(thiz, property)();
    } catch (e) {
      const propertyStr = getPropertyErrorString(property);
      throw new RethrownError(
        e,
        `privates.call(${thiz}, ${propertyStr}) failed. ${e.message}`
      );
    }
  }

  get(thiz, property) {
    try {
      return this.getProps(thiz)[property];
    } catch (e) {
      const propertyStr = getPropertyErrorString(property);
      throw new RethrownError(
        e,
        `privates.get(${thiz}, ${propertyStr}) failed. ${e.message}`
      );
    }
  }

  getProps(thiz) {
    try {
      let properties = this.privates.get(thiz);
      if (!properties) this.privates.set(thiz, (properties = {}));
      return properties;
    } catch (e) {
      if (thiz == null)
        throw new RethrownError(e, `thiz cannot be null or undefined.`);
      throw e;
    }
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

  subset(thiz, ...properties) {
    const object = {};
    for (let i = 0; i < properties.length; i++)
      object[properties[i]] = this.get(thiz, properties[i]);
    return object;
  }
}

function getPropertyErrorString(property) {
  // https://stackoverflow.com/a/7772724
  if (typeof property === "string" || property instanceof String)
    return `"${property}"`;
  return `${property}`;
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
