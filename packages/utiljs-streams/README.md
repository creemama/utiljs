# utiljs-streams

> JavaScript utility methods for Node.js streams

<p>
  <a href="https://www.npmjs.com/package/utiljs-streams"><img alt="NPM Status" src="https://img.shields.io/npm/v/utiljs-streams.svg?style=flat"></a>
  <a href="https://travis-ci.org/creemama/utiljs"><img alt="Travis CI Build Status" src="https://img.shields.io/travis/creemama/utiljs/master.svg?style=flat-square&label=Travis+CI"></a>
</p>

```js
const streams = require("utiljs-streams");
const readable = streams.fromString("The programmer learneth");
streams.stringify(readable).then(console.log); // Outputs "The programmer learneth".
```

This class contains all the members of [Stream](https://nodejs.org/api/stream.html) in addition to:

- [fromString](#Streams+fromString)
- [stringify](#Streams+stringify)

<a name="Streams"></a>

## Streams API

**Kind**: global class  
**Access**: public

- [Streams](#Streams)
  - [new Streams()](#new_Streams_new)
  - [.Duplex](#Streams+Duplex)
    - [new this.Duplex()](#new_Streams+Duplex_new)
  - [.PassThrough](#Streams+PassThrough)
    - [new this.PassThrough()](#new_Streams+PassThrough_new)
  - [.Readable](#Streams+Readable)
    - [new this.Readable()](#new_Streams+Readable_new)
  - [.Stream](#Streams+Stream)
    - [new this.Stream()](#new_Streams+Stream_new)
  - [.Transform](#Streams+Transform)
    - [new this.Transform()](#new_Streams+Transform_new)
  - [.Writable](#Streams+Writable)
    - [new this.Writable()](#new_Streams+Writable_new)
  - [.finished(stream, [callback])](#Streams+finished) ⇒ <code>undefined</code> \| <code>Promise</code>
  - [.fromString(string, [encoding])](#Streams+fromString) ⇒ <code>Readable</code>
  - [.newReadable([params])](#Streams+newReadable) ⇒ <code>Readable</code>
  - [.newWritable([params])](#Streams+newWritable) ⇒ <code>Writable</code>
  - [.pipeline([callback])](#Streams+pipeline) ⇒ <code>undefined</code> \| <code>Promise</code>
  - [.stringify(readable, [callback])](#Streams+stringify) ⇒ <code>undefined</code> \| <code>Promise</code>

<a name="new_Streams_new"></a>

### new Streams()

JavaScript utility methods for [Node.js streams](https://nodejs.org/api/stream.html)

<a name="Streams+Duplex"></a>

### streams.Duplex

**Kind**: instance class of [<code>Streams</code>](#Streams)  
**Access**: public  
<a name="new_Streams+Duplex_new"></a>

#### new this.Duplex()

A stream that is both Readable and Writable (for example, a TCP socket connection or net.Socket).

See Node.js's documentation about [Duplex](https://nodejs.org/api/stream.html#stream_implementing_a_duplex_stream).

<a name="Streams+PassThrough"></a>

### streams.PassThrough

**Kind**: instance class of [<code>Streams</code>](#Streams)  
**Access**: public  
<a name="new_Streams+PassThrough_new"></a>

#### new this.PassThrough()

A trivial implementation of a Transform stream that simply passes the input bytes across to the output.

See Node.js's documentation about [PassThrough](https://nodejs.org/api/stream.html#stream_class_stream_passthrough).

<a name="Streams+Readable"></a>

### streams.Readable

**Kind**: instance class of [<code>Streams</code>](#Streams)  
**Access**: public  
<a name="new_Streams+Readable_new"></a>

#### new this.Readable()

A stream from which data can be read, an abstraction of a source (for example, [fs.createReadStream()](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)).

See Node.js's documentation about [Readable](https://nodejs.org/api/stream.html#stream_readable_streams).

<a name="Streams+Stream"></a>

### streams.Stream

**Kind**: instance class of [<code>Streams</code>](#Streams)  
**Access**: public  
<a name="new_Streams+Stream_new"></a>

#### new this.Stream()

An abstraction of sources (a place where data can be read from) and destinations (a place where data can be written to).

See Node.js's documentation about [Stream](https://nodejs.org/api/stream.html).

<a name="Streams+Transform"></a>

### streams.Transform

**Kind**: instance class of [<code>Streams</code>](#Streams)  
**Access**: public  
<a name="new_Streams+Transform_new"></a>

#### new this.Transform()

[Duplex](Duplex) streams where the output is in some way related to the input (for example, [zlib.createDeflate()](https://nodejs.org/api/zlib.html#zlib_zlib_createdeflate_options)).

See Node.js's documentation about [Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform).

<a name="Streams+Writable"></a>

### streams.Writable

**Kind**: instance class of [<code>Streams</code>](#Streams)  
**Access**: public  
<a name="new_Streams+Writable_new"></a>

#### new this.Writable()

A stream to which data can be written, an abstraction of a destination (for example, [fs.createWriteStream()](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)).

See Node.js's documentation about [Writable](https://nodejs.org/api/stream.html#stream_writable_streams).

<a name="Streams+finished"></a>

### streams.finished(stream, [callback]) ⇒ <code>undefined</code> \| <code>Promise</code>

Sends a notification when a stream is no longer readable, writable, or has experienced an error or a premature close event.

See Node.js's documentation about [finished](https://nodejs.org/api/stream.html#stream_stream_finished_stream_callback).

**Kind**: instance method of [<code>Streams</code>](#Streams)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if a callback is specified or a Promise that resolves once the stream has finished  
**Throws**:

- <code>Error</code> If the Node.js version does not implement stream.finished

**Access**: public

| Param      | Type                  | Description                                               |
| ---------- | --------------------- | --------------------------------------------------------- |
| stream     | <code>Stream</code>   | A readable and/or writable stream                         |
| [callback] | <code>function</code> | A callback function that takes an optional error argument |

<a name="Streams+fromString"></a>

### streams.fromString(string, [encoding]) ⇒ <code>Readable</code>

Converts a string into a stream.

A [Stack Overflow answer](http://stackoverflow.com/a/22085851) inspired this implementation.

**Kind**: instance method of [<code>Streams</code>](#Streams)  
**Returns**: <code>Readable</code> - A stream of the specified string  
**Throws**:

- <code>TypeError</code> If string is not a string

**Access**: public

| Param      | Type                | Description                                                                            |
| ---------- | ------------------- | -------------------------------------------------------------------------------------- |
| string     | <code>string</code> | The string to convert into a stream                                                    |
| [encoding] | <code>string</code> | Encoding of the string that must be a valid Buffer encoding, such as 'utf8' or 'ascii' |

<a name="Streams+newReadable"></a>

### streams.newReadable([params]) ⇒ <code>Readable</code>

Creates a new Readable stream.

See Node.js's documentation about [Readable](https://nodejs.org/api/stream.html#stream_new_stream_readable_options).

**Kind**: instance method of [<code>Streams</code>](#Streams)  
**Returns**: <code>Readable</code> - A new Readable instance  
**Access**: public

| Param                  | Type                  | Default                                                | Description                                                                                                                               |
| ---------------------- | --------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [params]               | <code>Object</code>   |                                                        |                                                                                                                                           |
| [params.highWaterMark] | <code>number</code>   | <code>16384 (16kb) or 16 for objectMode streams</code> | The maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource                           |
| [params.encoding]      | <code>string</code>   | <code>null</code>                                      | If specified, then buffers will be decoded to strings using the specified encoding                                                        |
| [params.objectMode]    | <code>boolean</code>  | <code>false</code>                                     | Whether this stream should behave as a stream of objects meaning that stream.read(n) returns a single value instead of a Buffer of size n |
| [params.read]          | <code>function</code> |                                                        | Implementation for the stream.\_read() method                                                                                             |
| [params.destroy]       | <code>function</code> |                                                        | Implementation for the stream.\_destroy() method                                                                                          |

<a name="Streams+newWritable"></a>

### streams.newWritable([params]) ⇒ <code>Writable</code>

Creates a new Writable stream.

See Node.js's documentation about [Writable](https://nodejs.org/api/stream.html#stream_constructor_new_stream_writable_options).

**Kind**: instance method of [<code>Streams</code>](#Streams)  
**Returns**: <code>Writable</code> - A new Writable instance  
**Access**: public

| Param                  | Type                  | Default                                                | Description                                                                                                                                                                                               |
| ---------------------- | --------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [params]               | <code>Object</code>   |                                                        |                                                                                                                                                                                                           |
| [params.highWaterMark] | <code>number</code>   | <code>16384 (16kb) or 16 for objectMode streams</code> | Buffer level when stream.write() starts returning false                                                                                                                                                   |
| [params.decodeStrings] | <code>boolean</code>  | <code>true</code>                                      | Whether or not to decode strings into Buffers before passing them to stream.\_write()                                                                                                                     |
| [params.objectMode]    | <code>boolean</code>  | <code>false</code>                                     | Whether or not the stream.write(anyObj) is a valid operation. When set, it becomes possible to write JavaScript values other than string, Buffer or Uint8Array if supported by the stream implementation. |
| [params.emitClose]     | <code>boolean</code>  | <code>true</code>                                      | Whether or not the stream should emit 'close' after it has been destroyed                                                                                                                                 |
| [params.write]         | <code>function</code> |                                                        | Implementation for the stream.\_write() method                                                                                                                                                            |
| [params.writev]        | <code>function</code> |                                                        | Implementation for the stream.\_writev() method                                                                                                                                                           |
| [params.destroy]       | <code>function</code> |                                                        | Implementation for the stream.\_destroy() method                                                                                                                                                          |
| [params.final]         | <code>function</code> |                                                        | Implementation for the stream.\_final() method                                                                                                                                                            |

<a name="Streams+pipeline"></a>

### streams.pipeline([callback]) ⇒ <code>undefined</code> \| <code>Promise</code>

Pipes between streams forwarding errors and properly cleaning up and notifies when the pipeline is complete via a callback or a Promise.

See Node.js's documentation about [pipeline](https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback).

**Kind**: instance method of [<code>Streams</code>](#Streams)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if a callback is specified or a Promise that resolves once the pipeline is complete  
**Throws**:

- <code>Error</code> If the Node.js version does not implement stream.pipeline

**Access**: public

| Param      | Type                  | Description                                               |
| ---------- | --------------------- | --------------------------------------------------------- |
| ...streams | <code>Stream</code>   | Two or more streams to pipe between                       |
| [callback] | <code>function</code> | A callback function that takes an optional error argument |

<a name="Streams+stringify"></a>

### streams.stringify(readable, [callback]) ⇒ <code>undefined</code> \| <code>Promise</code>

Converts a stream into a string.

A [Stack Overflow answer](http://stackoverflow.com/a/26076032) inspired this implementation.

**Kind**: instance method of [<code>Streams</code>](#Streams)  
**Returns**: <code>undefined</code> \| <code>Promise</code> - undefined if a callback is specified or a Promise that resolves with the resulting string  
**Access**: public

| Param      | Type                  | Description                                                         |
| ---------- | --------------------- | ------------------------------------------------------------------- |
| readable   | <code>Readable</code> | The stream to convert into a string                                 |
| [callback] | <code>function</code> | A callback function that takes two arguments, a string and an error |
