"use strict";

const { expect } = require("chai"),
  jQueryUtils = require(".."),
  { JSDOM } = require("jsdom"),
  promises = require("utiljs-promises");

describe("JQueryUtils", () => {
  describe("#loadjQuery(params[, callback])", () => {
    it("should successfully load jQuery and return a Promise", () => {
      const dom = new JSDOM(
        `<!DOCTYPE html><html><body><script></script></body></html>`,
        { resources: "usable", runScripts: "dangerously" }
      );
      const window = dom.window;
      global.document = window.document;
      return jQueryUtils.loadjQuery({ window }).then($ => {
        expect(window.document.body.innerHTML).to.eql(
          '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script></script>'
        );
        expect($.fn.jquery).to.eql("3.3.1");
      });
    });

    it("should successfully load jQuery when src is specified", () => {
      const dom = new JSDOM(
        `<!DOCTYPE html><html><body><script></script></body></html>`,
        { resources: "usable", runScripts: "dangerously" }
      );
      const window = dom.window;
      global.document = window.document;
      return jQueryUtils
        .loadjQuery({
          src:
            "https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js",
          window
        })
        .then($ => {
          expect(window.document.body.innerHTML).to.eql(
            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script><script></script>'
          );
          expect($.fn.jquery).to.eql("3.1.0");
        });
    });

    it("should successfully load jQuery and notify a callback", callback => {
      const dom = new JSDOM(
        `<!DOCTYPE html><html><body><script></script></body></html>`,
        { resources: "usable", runScripts: "dangerously" }
      );
      const window = dom.window;
      global.document = window.document;
      return jQueryUtils.loadjQuery({ window }, (error, $) => {
        if (error) return callback(error);
        try {
          expect(window.document.body.innerHTML).to.eql(
            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script></script>'
          );
          expect($.fn.jquery).to.eql("3.3.1");
          callback();
        } catch (err) {
          callback(err);
        }
      });
    });

    it("should throw an error when params is undefined, null, or params has an invalid window object", () => {
      const a = jQueryUtils
        .loadjQuery()
        .then($ =>
          expect.fail("We expected the function to throw a TypeError.")
        )
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
      const b = jQueryUtils
        .loadjQuery(null)
        .then($ =>
          expect.fail("We expected the function to throw a TypeError.")
        )
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
      const c = jQueryUtils
        .loadjQuery({ window: {} })
        .then($ =>
          expect.fail("We expected the function to throw a TypeError.")
        )
        .catch(error => expect(error).to.be.an.instanceof(TypeError));
      return promises.all([a, b, c]);
    });

    it("should handle hijacking of the src parameter", () => {
      const dom = new JSDOM(
        `<!DOCTYPE html><html><body><script></script></body></html>`
      );
      const window = dom.window;
      jQueryUtils.loadjQuery({
        src: '"></script><p>Intruder Code</p><br style="',
        window
      });
      expect(window.document.body.innerHTML).to.eql(
        '<script src="&quot;></script><p>Intruder Code</p><br style=&quot;"></script><script></script>'
      );
    });

    it("should handle failure gracefully", () => {
      const dom = new JSDOM(
        `<!DOCTYPE html><html><body><script></script></body></html>`,
        { resources: "usable", runScripts: "dangerously" }
      );
      const window = dom.window;
      global.document = window.document;
      return jQueryUtils
        .loadjQuery({
          src:
            "https://ajax.googleapis.com/ajax/libs/mootools/1.6.0/mootools.min.js",
          window
        })
        .then($ =>
          expect.fail("We expected the function to throw a TypeError.")
        )
        .catch(error => expect(error).to.be.an.instanceof(Error));
    });
  });
});
