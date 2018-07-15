"use strict";

/**
 * JavaScript utility methods for [jQuery]{@link https://jquery.com/}
 * @public
 * @class
 */
class JQueryUtils {
  /**
   * Loads jQuery asynchronously and sends a notification when loading has finished
   *
   * @example
   * const jQueryUtils = require("utiljs-jquery");
   * jQueryUtils
   *   .loadjQuery({ window })
   *   .then($ => console.log($))
   *   .catch(console.log);
   *
   * @example
   * const jQueryUtils = require("utiljs-jquery");
   * jQueryUtils
   *   .loadjQuery({
   *     src: "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
   *     window
   *   })
   *   .then($ => console.log($))
   *   .catch(console.log);
   *
   * @example
   * const jQueryUtils = require("utiljs-jquery");
   * jQueryUtils.loadjQuery({ window }, (error, $) => {
   *   if (error) return console.log(error);
   *   console.log($);
   * });
   *
   * @param {Object} params
   * @param {string} [params.src=https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js] - The jQuery script to load
   * @param {Window} params.window - The browser's window
   * @param {Function} [callback] - A callback function that takes two arguments: error and jQuery
   * @returns {(undefined|Promise)} undefined if a callback is specified or a Promise that returns jQuery once jQuery has finished loading
   * @throws {Error} If params is undefined, null, or params has an invalid window object
   * @public
   * @instance
   * @function
   */
  loadjQuery(params, callback) {
    if (!callback)
      return promises().promisifyAndCall(this, this.loadjQuery, params);

    const src =
      params.src ||
      "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    const wnd = params.window;

    const scriptElement = wnd.document.createElement("script");
    scriptElement.async = 1;
    scriptElement.onload = () => {
      if (wnd.jQuery) callback(null, wnd.jQuery);
      else callback(new Error("We failed to load jQuery from " + src + "."));
    };
    scriptElement.src = src;

    const existingScriptElement = wnd.document.getElementsByTagName(
      "script"
    )[0];
    existingScriptElement.parentNode.insertBefore(
      scriptElement,
      existingScriptElement
    );
  }
}

module.exports = JQueryUtils;

const dependencies = {};

function promises() {
  return (
    dependencies["utiljs-promises"] ||
    (dependencies["utiljs-promises"] = require("utiljs-promises"))
  );
}
