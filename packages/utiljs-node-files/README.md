# @util.js/node-files

> JavaScript Node.js utility methods for files

<p>
  <a href="https://www.npmjs.com/package/@util.js/node-files"><img alt="NPM Status" src="https://img.shields.io/npm/v/@util.js/node-files.svg?style=flat"></a>
</p>

@util.js/node-files is part of [Util.js](https://github.com/creemama/utiljs).

This class contains all the methods of [fs](https://nodejs.org/api/fs.html) and [path](https://nodejs.org/api/path.html) in addition to:

- cpr
- diff
- filesWithExtension
- filesWithExtensionSync
- isDirectory
- isDirectorySync
- isFile
- isFileSync
- mkdirp
- mkdirpSync
- readFiles
- readLastLines
- rmrf
- rmrfSync
- sanitizeFilename
- touch
  <a name="module_Files"></a>

## Files

<a name="module_Files+readLastLines"></a>

### files.readLastLines(path, maxLineCount, [encoding], [callback]) ⇒ <code>Promise</code> \| <code>undefined</code>

Reads in the last `n` lines of a file.

This function just delegates to https://github.com/alexbbt/read-last-lines .

**Kind**: instance method of [<code>Files</code>](#module_Files)  
**Returns**: <code>Promise</code> \| <code>undefined</code> - a `Promise` that resolves with the lines (as a
`String` or a `Buffer`) or rejects with an error or `undefined` if a
`callback` is specified

| Param        | Type                                                           | Default                       | Description                                                             |
| ------------ | -------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| path         | <code>Buffer</code> \| <code>String</code> \| <code>URL</code> |                               | absolute or relative path to a file; `URL`s must use the file:// scheme |
| maxLineCount | <code>Number</code>                                            |                               | max number of lines to read                                             |
| [encoding]   | <code>String</code>                                            | <code>&quot;utf8&quot;</code> | specifies the character encoding to use or `"buffer"`                   |
| [callback]   | <code>function</code>                                          |                               | an optional callback                                                    |
