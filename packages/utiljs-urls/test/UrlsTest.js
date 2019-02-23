"use strict";

const expect = require("chai").expect,
  files = require("@util.js/files"),
  targetDir = __dirname + "/../target",
  urls = require("..");

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
    it("handles HTTP errors", () =>
      download_url_destination("http://doesnotexist").then(
        value => {
          throw new Error("Unexpected success");
        },
        error => {
          /* expected */
        }
      ));
    it("handles HTTPS errors", () =>
      download_url_destination("https://doesnotexist").then(
        value => {
          throw new Error("Unexpected success");
        },
        error => {
          /* expected */
        }
      ));
  });

  describe("#download(url, destination, callback)", () => {
    it("handles HTTP requests", callback =>
      download_url_destination_callback("http://www.google.com", callback));
    it("handles HTTPS requests", callback =>
      download_url_destination_callback("https://www.google.com", callback));
    it("handles HTTP errors", callback =>
      download_url_destination_callback("http://doesnotexist", error => {
        if (error) return callback();
        callback(new Error("Unexpected success"));
      }));
    it("handles HTTPS errors", callback =>
      download_url_destination_callback("https://doesnotexist", error => {
        if (error) return callback();
        callback(new Error("Unexpected success"));
      }));
  });

  describe("#headers(url)", () => {
    it("handles HTTP requests", () => urls.headers("http://www.google.com"));
    it("handles HTTPS requests", () => urls.headers("https://www.google.com"));
    it("handles HTTP errors", () =>
      urls.headers("http://doesnotexist").then(
        value => {
          throw new Error("Unexpected success");
        },
        error => {
          /* expected */
        }
      ));
    it("handles HTTPS errors", () =>
      urls.headers("https://doesnotexist").then(
        value => {
          throw new Error("Unexpected success");
        },
        error => {
          /* expected */
        }
      ));
  });

  describe("#headers(url, callback)", () => {
    it("handles HTTP requests", callback =>
      urls.headers("http://www.google.com", callback));
    it("handles HTTPS requests", callback =>
      urls.headers("https://www.google.com", callback));
    it("handles HTTP errors", callback =>
      urls.headers("http://doesnotexist", error => {
        if (error) return callback();
        callback(new Error("Unexpected success"));
      }));
    it("handles HTTPS errors", callback =>
      urls.headers("https://doesnotexist", error => {
        if (error) return callback();
        callback(new Error("Unexpected success"));
      }));
  });
});

async function download_url_destination(url) {
  await files.mkdirp(targetDir);
  return await urls.download(url, targetDir + "/download_url_destination.html");
}

function download_url_destination_callback(url, callback) {
  async_download_url_destination_callback(url, callback);
}

async function async_download_url_destination_callback(url, callback) {
  await files.mkdirp(targetDir);
  await new Promise((resolve, reject) => {
    urls.download(
      url,
      targetDir + "/async_download_url_destination_callback.html",
      error => {
        if (error) return reject(error);
        resolve();
      }
    );
  })
    .then(_ => callback())
    .catch(error => callback(error));
}
