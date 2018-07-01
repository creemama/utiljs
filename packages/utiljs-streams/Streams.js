"use strict";

module.exports = function Streams() {
  this.newReadable = newReadable;
  this.stringify = stringify;

  const o = {};
  function promises() {
    if (!o.promises) o.promises = require("utiljs-promises");
    return o.promises;
  }
  function stream() {
    if (!o.stream) o.stream = require("stream");
    return o.stream;
  }

  function newReadable() {
    return new stream().Readable();
  }

  // http://stackoverflow.com/a/26076032
  function stringify(readable, callback) {
    if (!callback)
      return promises().promisifyAndCall(this, stringify, readable);

    let string = "";
    readable
      .on("readable", () => {
        var buffer = readable.read();
        if (buffer !== null) string += buffer;
      })
      .on("end", () => callback(null, string))
      .on("error", error => callback(error));
  }
};
