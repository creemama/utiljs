"use strict";

const { expect } = require("chai"),
  stream = require("stream"),
  streams = require(__dirname + "/..");

describe("Streams", function() {
  describe("#finished(stream[, callback])", () => {
    it("should call callback when finished", callback => {
      if (!stream.finished) return callback();
      const readable = streams.fromString("frog\ncat");
      streams.finished(readable, callback);
    });
    it("should resolve the returned Promise when finished", () => {
      if (!stream.finished) return;
      const readable = streams.fromString("frog\ncat");
      const promise = streams.finished(readable);
      return promise;
    });
  });

  describe("#pipeline(...streams[, callback])", () => {
    it("should call callback when finished", callback => {
      if (!stream.pipeline) return callback();
      const readable = streams.fromString("frog\ncat");
      let out = "";
      const writable = streams.newWritable({
        write(chunk, encoding, callback) {
          out += chunk.toString();
          callback();
        }
      });
      streams.pipeline(readable, writable, error => {
        expect(out).to.eql("frog\ncat");
        callback(error);
      });
    });
    it("should resolve the returned Promise when finished", () => {
      if (!stream.pipeline) return;
      const readable = streams.fromString("frog\ncat");
      let out = "";
      const writable = streams.newWritable({
        write(chunk, encoding, callback) {
          out += chunk.toString();
          callback();
        }
      });
      return streams.pipeline(readable, writable).then(() => {
        expect(out).to.eql("frog\ncat");
      });
    });
  });

  describe("#stringify(readable)", () => {
    it("should successfully stringify a Readable", () => {
      const readable = streams.fromString("frog\ncat");
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
      const stream = streams.fromString("frog\ncat");
      streams.stringify(stream, function(err, string) {
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

  describe("#fromString(string)", () => {
    it("should create a Readable from a string", () => {
      const readable = streams.fromString("foo bar");
      return streams
        .stringify(readable)
        .then(string => expect(string).to.eql("foo bar"));
    });
    it("should create a Readable from an empty string", () => {
      const readable = streams.fromString("");
      return streams
        .stringify(readable)
        .then(string => expect(string).to.eql(""));
    });
    it("should error on non-string input", () => {
      expect(() => streams.fromString()).to.throw(TypeError);
      expect(() => streams.fromString({ foo: "bar" })).to.throw(TypeError);
      expect(() => streams.fromString(["a", "b"])).to.throw(TypeError);
      expect(() => streams.fromString(null)).to.throw(TypeError);
    });
  });
});
