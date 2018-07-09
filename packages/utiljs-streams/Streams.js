"use strict";

const dependencies = {};

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
    dependencies[dependency] || (dependencies[dependency] = require(dependency))
  );
}

module.exports = Streams;

/**
 * JavaScript utility methods for [Node.js streams]{@link https://nodejs.org/api/stream.html}
 * @public
 * @class
 */
function Streams() {
  /**
   * Sends a notification when a stream is no longer readable, writable, or has experienced an error or a premature close event.
   *
   * See Node.js's documentation about [finished]{@link https://nodejs.org/api/stream.html#stream_stream_finished_stream_callback}.
   *
   * @param {Stream} stream - A readable and/or writable stream
   * @param {Function} [callback] - A callback function that takes an optional error argument
   * @returns {(undefined|Promise)} undefined if a callback is specified or a Promise that resolves once the stream has finished
   * @throws {Error} If the Node.js version does not implement stream.finished
   * @public
   * @instance
   * @function
   */
  this.finished = finished;

  /**
   * Converts a string into a stream.
   *
   * A [Stack Overflow answer]{@link http://stackoverflow.com/a/22085851} inspired this implementation.
   *
   * @param {string} string - The string to convert into a stream
   * @param {string} [encoding] - Encoding of the string that must be a valid Buffer encoding, such as 'utf8' or 'ascii'
   * @return {Readable} A stream of the specified string
   * @throws {TypeError} If string is not a string
   * @public
   * @instance
   * @function
   */
  this.fromString = fromString;

  /**
   * Creates a new Readable stream.
   *
   * See Node.js's documentation about [Readable]{@link https://nodejs.org/api/stream.html#stream_new_stream_readable_options}.
   *
   * @param {Object} [params]
   * @param {number} [params.highWaterMark=16384 (16kb) or 16 for objectMode streams] - The maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource
   * @param {string} [params.encoding=null] - If specified, then buffers will be decoded to strings using the specified encoding
   * @param {boolean=} [params.objectMode=false] - Whether this stream should behave as a stream of objects meaning that stream.read(n) returns a single value instead of a Buffer of size n
   * @param {Function=} [params.read] - Implementation for the stream._read() method
   * @param {Function=} [params.destroy] - Implementation for the stream._destroy() method
   * @returns {Readable} A new Readable instance
   * @public
   * @instance
   * @function
   */
  this.newReadable = newReadable;

  /**
   * Creates a new Writable stream.
   *
   * See Node.js's documentation about [Writable]{@link https://nodejs.org/api/stream.html#stream_constructor_new_stream_writable_options}.
   *
   * @param {Object} [params]
   * @param {number} [params.highWaterMark=16384 (16kb) or 16 for objectMode streams] - Buffer level when stream.write() starts returning false
   * @param {boolean} [params.decodeStrings=true] - Whether or not to decode strings into Buffers before passing them to stream._write()
   * @param {boolean} [params.objectMode=false] - Whether or not the stream.write(anyObj) is a valid operation. When set, it becomes possible to write JavaScript values other than string, Buffer or Uint8Array if supported by the stream implementation.
   * @param {boolean} [params.emitClose=true] - Whether or not the stream should emit 'close' after it has been destroyed
   * @param {Function} [params.write] - Implementation for the stream._write() method
   * @param {Function} [params.writev] - Implementation for the stream._writev() method
   * @param {Function} [params.destroy] - Implementation for the stream._destroy() method
   * @param {Function} [params.final] - Implementation for the stream._final() method
   * @returns {Writable} A new Writable instance
   * @public
   * @instance
   * @function
   */
  this.newWritable = newWritable;

  /**
   * Pipes between streams forwarding errors and properly cleaning up and notifies when the pipeline is complete via a callback or a Promise.
   *
   * See Node.js's documentation about [pipeline]{@link https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback}.
   *
   * @param {Stream} ...streams - Two or more streams to pipe between
   * @param {Function} [callback] - A callback function that takes an optional error argument
   * @returns {(undefined|Promise)} undefined if a callback is specified or a Promise that resolves once the pipeline is complete
   * @throws {Error} If the Node.js version does not implement stream.pipeline
   * @public
   * @instance
   * @function
   */
  this.pipeline = pipeline;

  /**
   * Converts a stream into a string.
   *
   * A [Stack Overflow answer]{@link http://stackoverflow.com/a/26076032} inspired this implementation.
   *
   * @param {Readable} readable - The stream to convert into a string
   * @param {Function} [callback] - A callback function that takes two arguments, a string and an error
   * @returns {(undefined|Promise)} undefined if a callback is specified or a Promise that resolves with the resulting string
   * @public
   * @instance
   * @function
   */
  this.stringify = stringify;

  /**
   * A stream that is both Readable and Writable (for example, a TCP socket connection or net.Socket).
   *
   * See Node.js's documentation about [Duplex]{@link https://nodejs.org/api/stream.html#stream_implementing_a_duplex_stream}.
   *
   * @public
   * @class
   */
  this.Duplex = stream().Duplex;

  /**
   * A trivial implementation of a Transform stream that simply passes the input bytes across to the output.
   *
   * See Node.js's documentation about [PassThrough]{@link https://nodejs.org/api/stream.html#stream_class_stream_passthrough}.
   *
   * @public
   * @class
   */
  this.PassThrough = stream().PassThrough;

  /**
   * A stream from which data can be read, an abstraction of a source (for example, [fs.createReadStream()]{@link https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options}).
   *
   * See Node.js's documentation about [Readable]{@link https://nodejs.org/api/stream.html#stream_readable_streams}.
   *
   * @public
   * @class
   */
  this.Readable = stream().Readable;

  /**
   * An abstraction of sources (a place where data can be read from) and destinations (a place where data can be written to).
   *
   * See Node.js's documentation about [Stream]{@link https://nodejs.org/api/stream.html}.
   *
   * @public
   * @class
   */
  this.Stream = stream().Stream;

  /**
   * {@link Duplex} streams where the output is in some way related to the input (for example, [zlib.createDeflate()]{@link https://nodejs.org/api/zlib.html#zlib_zlib_createdeflate_options}).
   *
   * See Node.js's documentation about [Transform]{@link https://nodejs.org/api/stream.html#stream_class_stream_transform}.
   *
   * @public
   * @class
   */
  this.Transform = stream().Transform;

  /**
   * A stream to which data can be written, an abstraction of a destination (for example, [fs.createWriteStream()]{@link https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options}).
   *
   * See Node.js's documentation about [Writable]{@link https://nodejs.org/api/stream.html#stream_writable_streams}.
   *
   * @public
   * @class
   */
  this.Writable = stream().Writable;

  function finished() {
    if (!stream().finished)
      throw new Error(
        "This version of Node.js does not support stream.finished."
      );
    return promises().call(stream(), stream().finished, arguments);
  }

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

  function stringify(readable, callback) {
    if (!callback)
      return promises().promisifyAndCall(this, stringify, readable);

    let string = "";
    readable
      .on("readable", () => {
        const buffer = readable.read();
        if (buffer !== null) string += buffer;
      })
      .on("end", () => callback(null, string))
      .on("error", error => callback(error));
  }
}
