"use strict";

module.exports = Streams;

function Streams() {
  this.finished = finished;
  this.fromString = fromString;
  this.newReadable = newReadable;
  this.newWritable = newWritable;
  this.pipeline = pipeline;
  this.stringify = stringify;

  const dependencies = {};

  this.Duplex = stream().Duplex;
  this.PassThrough = stream().PassThrough;
  this.Readable = stream().Readable;
  this.Stream = stream().Stream;
  this.Transform = stream().Transform;
  this.Writable = stream().Writable;

  function promises() {
    return get("utiljs-promises");
  }
  function stream() {
    return get("stream");
  }
  function strings() {
    return get("utiljs-strings");
  }
  function get(dependency) {
    return (
      dependencies[dependency] ||
      (dependencies[dependency] = require(dependency))
    );
  }

  function finished() {
    if (!stream().finished)
      throw new Error(
        "This version of Node.js does not support stream.finished."
      );
    return promises().call(stream(), stream().finished, arguments);
  }

  // http://stackoverflow.com/a/22085851
  function fromString(string, encoding) {
    if (!strings().isString(string))
      throw new TypeError("Expected string to be a string but was " + string);
    const readable = newReadable();
    readable.push(string, encoding);
    readable.push(null);
    readable.resume(); // Drain the stream.
    return readable;
  }

  function newReadable() {
    return new stream().Readable(...arguments);
  }

  function newWritable() {
    return new stream().Writable(...arguments);
  }

  function pipeline() {
    if (!stream().pipeline)
      throw new Error(
        "This version of Node.js does not support stream.pipeline."
      );
    return promises().call(stream(), stream().pipeline, arguments);
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
}
