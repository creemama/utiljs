"use strict";

const { expect } = require("chai");
const stream = require("stream");
const streams = require("..");

describe("Streams", () => {
  describe("#finished(stream[, callback])", () => {
    it("should call callback when finished", (callback) => {
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
    it("should call callback when finished", (callback) => {
      if (!stream.pipeline) return callback();
      const readable = streams.fromString("frog\ncat");
      let out = "";
      const writable = streams.newWritable({
        write(chunk, encoding, callback) {
          out += chunk.toString();
          callback();
        },
      });
      streams.pipeline(readable, writable, (error) => {
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
        },
      });
      return streams.pipeline(readable, writable).then(() => {
        expect(out).to.eql("frog\ncat");
      });
    });
  });

  describe("#stringify(readable[, callback])", () => {
    it("should successfully stringify a Readable and return a Promise", () => {
      const readable = streams.fromString("frog\ncat");
      return streams
        .stringify(readable)
        .then((string) => expect(string).to.equal("frog\ncat"));
    });
    it("should throw an error if the readable is null and return a Promise", async function () {
      await streams.stringify().then(
        () => {
          throw new Error("Unexpected success");
        },
        (error) => {
          if (!error) throw new Error("Unexpected")
        }
      );
      await streams.stringify(null).then(
        () => {
          throw new Error("Unexpected success");
        },
        (error) => {
          if (!error) throw new Error("Unexpected")
        }
      );
      await streams.stringify(null, null).then(
        () => {
          throw new Error("Unexpected success");
        },
        (error) => {
          if (!error) throw new Error("Unexpected")
        }
      );
    });
    it("should successfully stringify a Readable and notify a callback", (callback) => {
      const stream = streams.fromString("frog\ncat");
      streams.stringify(stream, (error, string) => {
        expect(error).to.be.null;
        expect(string).to.equal("frog\ncat");
        callback();
      });
    });
    it("should throw an error if any argument is null and notify a callback", () => {
      expect(() => {
        streams.stringify(null, () => {});
      }).to.throw(Error);
    });
  });

  describe("#fromString(string[, encoding])", () => {
    it("should create a Readable from a string", () => {
      const readable = streams.fromString("foo bar");
      return streams
        .stringify(readable)
        .then((string) => expect(string).to.eql("foo bar"));
    });
    it("should create a Readable from an empty string", () => {
      const readable = streams.fromString("");
      return streams
        .stringify(readable)
        .then((string) => expect(string).to.eql(""));
    });
    it("should properly handle encoding", async function () {
      let readable = streams.fromString("El Niño & La Niña", "ascii");
      const ascii = await streams.stringify(readable);
      expect(ascii).to.eql("El Ni�o & La Ni�a");
      readable = streams.fromString("El Niño & La Niña", "utf8");
      const utf8 = await streams.stringify(readable);
      expect(utf8).to.eql("El Niño & La Niña");
    });
    it("should error on non-string input", () => {
      expect(() => streams.fromString()).to.throw(TypeError);
      expect(() => streams.fromString({ foo: "bar" })).to.throw(TypeError);
      expect(() => streams.fromString(["a", "b"])).to.throw(TypeError);
      expect(() => streams.fromString(null)).to.throw(TypeError);
    });
  });
});
