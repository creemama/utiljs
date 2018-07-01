"use strict";

var expect = require("chai").expect;

var streams = require(__dirname);

describe("Streams", function() {
  describe("#stringify(readable)", () => {
    it("should successfully stringify a Readable", () => {
      const readable = streams.newReadable();
      readable.push("frog\ncat");
      readable.push(null);
      return streams
        .stringify(readable)
        .then(string => expect(string).to.equal("frog\ncat"));
    });
    it("should throw an error if the readable is null", stringify_readable);
    async function stringify_readable() {
      await streams.stringify().then(
        () => {
          throw new Error("Unexpected success");
        },
        error => {}
      );
      await streams.stringify(null).then(
        () => {
          throw new Error("Unexpected success");
        },
        error => {}
      );
      await streams.stringify(null, null).then(
        () => {
          throw new Error("Unexpected success");
        },
        error => {}
      );
    }
  });

  describe("#stringify(readable, callback)", () => {
    it("should successfully stringify a Readable", function(done) {
      // http://stackoverflow.com/a/22085851
      const s = streams.newReadable();
      s.push("frog\ncat");
      s.push(null);
      streams.stringify(s, function(err, string) {
        expect(err).to.be.null;
        expect(string).to.equal("frog\ncat");
        done();
      });
    });
    it("should throw an error if any argument is null", function() {
      expect(function() {
        streams.stringify(null, function() {});
      }).to.throw(Error);
    });
  });
});
