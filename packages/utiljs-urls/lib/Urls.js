"use strict";

class Urls {
  decodeURI() {
    return decodeURI(...arguments);
  }

  decodeURIComponent() {
    return decodeURIComponent(...arguments);
  }

  // http://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js
  download(url, destination, callback) {
    if (!callback)
      return promises().callCallback(this, this.download, url, destination);

    const parsedUrl = urlUtil().parse(url);

    const file = files().createWriteStream(destination);

    getProtocolObject(parsedUrl.protocol)
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => file.close(callback));
      })
      .on("error", (error) => {
        files().unlink(destination, (unlinkError) => {
          if (unlinkError) callback(unlinkError);
          callback(error);
        });
      });
  }

  encodeURI() {
    return encodeURI(...arguments);
  }

  encodeURIComponent() {
    return encodeURIComponent(...arguments);
  }

  // http://stackoverflow.com/questions/5922842/getting-http-headers-with-node-js
  // http://stackoverflow.com/a/6001507
  headers(url, callback) {
    if (!callback) return promises().callCallback(this, this.headers, url);

    const parsedUrl = urlUtil().parse(url);
    const port = parsedUrl.port
      ? parsedUrl.port
      : parsedUrl.protocol === "https:"
      ? 443
      : 80;
    getProtocolObject(parsedUrl.protocol)
      .request(
        {
          host: parsedUrl.host,
          method: "HEAD",
          path: parsedUrl.path,
          port: port,
        },
        (res) => callback(null, res.headers)
      )
      .on("error", (error) => {
        callback(error);
      })
      .end();
  }
}

module.exports = Urls;

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
  if (!protocolStr) return https();
  return protocolStr === "https:" ? https() : http();
}
