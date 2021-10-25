"use strict";

const expect = require("chai").expect;
const files = require("@util.js/node-files");
const targetDir = __dirname + "/../target";
const urls = require("..");
let fileNum = 0;

describe("Urls", () => {
  describe("#(de|en)codeURI", () => {
    it("should operate as expected", () => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI
      const encoded = "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B";
      const decoded = "https://mozilla.org/?x=шеллы";
      expect(urls.encodeURI(decoded)).to.eql(encoded);
      expect(urls.decodeURI(encoded)).to.eql(decoded);
    });
  });

  describe("#(de|en)codeURIComponent", () => {
    it("should operate as expected", () => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
      const encoded0 = "JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B";
      const decoded0 = "JavaScript_шеллы";
      const encoded1 = "%D1%88%D0%B5%D0%BB%D0%BB%D1%8B";
      const decoded1 = "шеллы";
      expect(urls.decodeURIComponent(encoded0)).to.eql(decoded0);
      expect(urls.decodeURIComponent(encoded1)).to.eql(decoded1);
      expect(urls.encodeURIComponent(decoded0)).to.eql(encoded0);
      expect(urls.encodeURIComponent(decoded1)).to.eql(encoded1);
    });
  });

  describe("#download(url, destination)", () => {
    it("handles HTTP requests", () =>
      download_url_destination("http://www.google.com"));
    it("handles HTTPS requests", () =>
      download_url_destination("https://www.google.com"));
    it("should throw an error if the protocol is not HTTP or HTTPS", () =>
      download_url_destination("ftp://www.google.com").then(
        (value) => {
          throw new Error("Unexpected success");
        },
        (error) => {
          expect(error).to.be.an.instanceof(TypeError);
        }
      ));
    it("should throw an error if there is no protocol", () =>
      download_url_destination("www.google.com").then(
        (value) => {
          throw new Error("Unexpected success");
        },
        (error) => {
          expect(error).to.be.an.instanceof(TypeError);
        }
      ));
    it("handles HTTP errors", () =>
      download_url_destination("http://doesnotexist:8080", {
        timeout: 50,
      }).then(
        (value) => {
          throw new Error("Unexpected success");
        },
        (error) => {
          /* expected */
        }
      ));
    it("handles HTTPS errors", () =>
      download_url_destination("https://doesnotexist:8443", {
        timeout: 50,
      }).then(
        (value) => {
          throw new Error("Unexpected success");
        },
        (error) => {
          /* expected */
        }
      ));
  });

  describe("#download(url, destination, callback)", () => {
    it("handles HTTP requests", (callback) =>
      download_url_destination_callback("http://www.google.com", callback));
    it("handles HTTPS requests", (callback) =>
      download_url_destination_callback("https://www.google.com", callback));
    it("handles HTTP errors", (callback) =>
      download_url_destination_callback(
        "http://doesnotexist:8080",
        { timeout: 50 },
        (error) => {
          if (error) return callback();
          callback(new Error("Unexpected success"));
        }
      ));
    it("handles HTTPS errors", (callback) =>
      download_url_destination_callback(
        "https://doesnotexist:8443",
        { timeout: 50 },
        (error) => {
          if (error) return callback();
          callback(new Error("Unexpected success"));
        }
      ));
  });

  describe("#headers(url)", () => {
    it("handles HTTP requests", () =>
      urls.headers("http://www.google.com").then((headers) => {
        expect(headers["content-type"].startsWith("text/html")).to.be.true;
      }));
    it("handles HTTPS requests", () =>
      urls.headers("https://www.google.com").then((headers) => {
        expect(headers["content-type"].startsWith("text/html")).to.be.true;
      }));
    it("handles HTTPS requests with null options", () =>
      urls.headers("https://www.google.com", null).then((headers) => {
        expect(headers["content-type"].startsWith("text/html")).to.be.true;
      }));
    it("handles HTTP errors", () =>
      urls.headers("http://doesnotexist:8080", { timeout: 50 }).then(
        (value) => {
          throw new Error("Unexpected success");
        },
        (error) => {
          /* expected */
        }
      ));
    it("handles HTTPS errors", () =>
      urls.headers("https://doesnotexist:8443", { timeout: 50 }).then(
        (value) => {
          throw new Error("Unexpected success");
        },
        (error) => {
          /* expected */
        }
      ));
  });

  describe("#headers(url, callback)", () => {
    it("handles HTTP requests", (callback) =>
      urls.headers("http://www.google.com", (error, headers) => {
        expect(headers["content-type"].startsWith("text/html")).to.be.true;
        callback(error);
      }));
    it("handles HTTPS requests", (callback) =>
      urls.headers("https://www.google.com", (error, headers) => {
        expect(headers["content-type"].startsWith("text/html")).to.be.true;
        callback(error);
      }));
    it("handles HTTP errors", (callback) =>
      urls.headers("http://doesnotexist:8080", { timeout: 50 }, (error) => {
        if (error) return callback();
        callback(new Error("Unexpected success"));
      }));
    it("handles HTTPS errors", (callback) =>
      urls.headers("https://doesnotexist:8443", { timeout: 50 }, (error) => {
        if (error) return callback();
        callback(new Error("Unexpected success"));
      }));
  });
});

async function download_url_destination(url, options) {
  await files.mkdirp(targetDir);
  const destination =
    targetDir +
    "/" +
    files.sanitizeFilename(
      fileNum++ + ".download_url_destination." + url + ".html",
      { replacement: "_" }
    );

  const readFile = (_) => files.readFile(destination, "utf8");
  const verifyFile = (text) =>
    expect(text.startsWith("<!doctype html>")).to.be.true;

  if (options)
    return await urls
      .download(url, destination, options)
      .then(readFile)
      .then(verifyFile);
  await urls.download(url, destination).then(readFile).then(verifyFile);
  return await urls
    .download(url, destination, null)
    .then(readFile)
    .then(verifyFile);
}

function download_url_destination_callback() {
  async_download_url_destination_callback(...arguments);
}

async function async_download_url_destination_callback(
  url,
  callbackOrOptions,
  callback
) {
  await files.mkdirp(targetDir);
  const cb = arguments[arguments.length - 1];
  const destination =
    targetDir +
    "/" +
    files.sanitizeFilename(
      fileNum++ + ".async_download_url_destination_callback." + url + ".html",
      { replacement: "_" }
    );
  const options = callbackOrOptions
    ? typeof callbackOrOptions === "function"
      ? null
      : callbackOrOptions
    : null;
  await new Promise((resolve, reject) => {
    const downloadCallback = (error) => {
      if (error) return reject(error);
      resolve();
    };
    if (options != null)
      urls.download(url, destination, options, downloadCallback);
    else urls.download(url, destination, downloadCallback);
  })
    .then((_) => files.readFile(destination, "utf8"))
    .then((text) => {
      expect(text.startsWith("<!doctype html>")).to.be.true;
      cb();
    })
    .catch((error) => cb(error));
}
