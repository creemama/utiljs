"use strict";

class Urls {
  decodeURI() {
    return decodeURI(...arguments);
  }

  decodeURIComponent() {
    return decodeURIComponent(...arguments);
  }

  // http://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js
  download(url, destination, callbackOrOptions, callback) {
    if (typeof arguments[arguments.length - 1] !== "function")
      return promises().callCallback(this, this.download, ...arguments);
    const cb = arguments[arguments.length - 1];
    const parsedUrl = URL ? new URL(url) : urlUtil().parse(url);
    const file = files().createWriteStream(destination);
    const options = callbackOrOptions
      ? typeof callbackOrOptions === "function"
        ? {}
        : callbackOrOptions
      : {};
    const request = getProtocolObject(parsedUrl.protocol)
      .get(url, options, (response) => {
        response.pipe(file);
        file.on("finish", () => file.close(cb));
      })
      .on("error", (error) => {
        files().unlink(destination, (unlinkError) => {
          cb(unlinkError ? unlinkError : error);
        });
      });
    const timeout = determineTimeout(callbackOrOptions);
    if (timeout !== -1) {
      // https://stackoverflow.com/a/12783062
      request.on("socket", (socket) => {
        socket.setTimeout(timeout);
        socket.on("timeout", () => {
          request.abort();
        });
      });
    }
  }

  encodeURI() {
    return encodeURI(...arguments);
  }

  encodeURIComponent() {
    return encodeURIComponent(...arguments);
  }

  // http://stackoverflow.com/questions/5922842/getting-http-headers-with-node-js
  // http://stackoverflow.com/a/6001507
  headers(url, callbackOrOptions, callback) {
    if (typeof arguments[arguments.length - 1] !== "function")
      return promises().callCallback(this, this.headers, ...arguments);
    const cb = arguments[arguments.length - 1];
    const parsedUrl = URL ? new URL(url) : urlUtil().parse(url);
    const port = parsedUrl.port
      ? parsedUrl.port
      : parsedUrl.protocol === "https:"
      ? 443
      : 80;

    let options = Object.assign(
      {},
      callbackOrOptions
        ? typeof callbackOrOptions === "function"
          ? {}
          : callbackOrOptions
        : {}
    );
    options = Object.assign(options, {
      host: parsedUrl.host,
      method: "HEAD",
      path: parsedUrl.path,
      port: port,
    });
    const request = getProtocolObject(parsedUrl.protocol)
      .request(options, (res) => cb(null, res.headers))
      .on("error", (error) => {
        cb(error);
      })
      .end();
    const timeout = determineTimeout(callbackOrOptions);
    if (timeout !== -1) {
      // https://stackoverflow.com/a/12783062
      request.on("socket", (socket) => {
        socket.setTimeout(timeout);
        socket.on("timeout", () => {
          request.abort();
        });
      });
    }
  }
}

module.exports = Urls;

function determineTimeout(params) {
  if (!params) return -1;
  const parsedInt = Number.parseInt(params.timeout);
  if (params.timeout != null && !Number.isNaN(parsedInt) && parsedInt >= 0)
    return parsedInt;
  return -1;
}

const dependencies = {};
function get(dependency) {
  return (
    dependencies[dependency] || (dependencies[dependency] = require(dependency))
  );
}

function files() {
  return get("@util.js/files");
}
function http() {
  return get("http");
}
function https() {
  return get("https");
}
function promises() {
  return get("@util.js/promises");
}
function urlUtil() {
  return get("url");
}

function getProtocolObject(protocolStr) {
  switch (protocolStr) {
    case "https:":
      return https();
    case "http:":
      return http();
    default:
      throw new TypeError(
        'The protocol must be "https:" or "http:", not "' + protocolStr + '"'
      );
  }
}
