"use strict";

const { expect } = require("chai");
const strings = require("..");

describe("Strings", () => {
  describe("#base64Url...", () => {
    it("should operate normally", () => {
      // From https://www.npmjs.com/package/base64url
      expect(
        strings.base64UrlEncode("ladies and gentlemen we are floating in space")
      ).to.equal(
        "bGFkaWVzIGFuZCBnZW50bGVtZW4gd2UgYXJlIGZsb2F0aW5nIGluIHNwYWNl"
      );
      expect(
        strings.base64UrlDecode("cmlkZTogZHJlYW1zIGJ1cm4gZG93bg")
      ).to.equal("ride: dreams burn down");
      expect(
        strings.base64ToBase64Url("qL8R4QIcQ/ZsRqOAbeRfcZhilN/MksRtDaErMA==")
      ).to.equal("qL8R4QIcQ_ZsRqOAbeRfcZhilN_MksRtDaErMA");
      expect(
        strings.base64UrlToBase64("qL8R4QIcQ_ZsRqOAbeRfcZhilN_MksRtDaErMA")
      ).to.equal("qL8R4QIcQ/ZsRqOAbeRfcZhilN/MksRtDaErMA==");
      const buf = Buffer.alloc(13);
      buf.writeUInt8(0x73, 0);
      buf.writeUInt8(0x70, 1);
      buf.writeUInt8(0x69, 2);
      buf.writeUInt8(0x72, 3);
      buf.writeUInt8(0x69, 4);
      buf.writeUInt8(0x74, 5);
      buf.writeUInt8(0x75, 6);
      buf.writeUInt8(0x61, 7);
      buf.writeUInt8(0x6c, 8);
      buf.writeUInt8(0x69, 9);
      buf.writeUInt8(0x7a, 10);
      buf.writeUInt8(0x65, 11);
      buf.writeUInt8(0x64, 12);
      expect(
        strings.base64UrlToBuffer("c3Bpcml0dWFsaXplZA").toString()
      ).to.equal(buf.toString());
    });
  });

  describe("#endsWith()", () => {
    it("should operate normally", () => {
      const str = "To be, or not to be, that is the question.";
      expect(strings.endsWith(str, "question.")).to.be.true;
      expect(strings.endsWith(str, "to be")).to.be.false;
      expect(strings.endsWith(str, "to be", 19)).to.be.true;
      expect(strings.endsWith(str, "question.", -19)).to.be.false;
    });
    it("should return false if position is negative", () => {
      const str = "To be, or not to be, that is the question.";
      expect(strings.endsWith(str, "question.", -19)).to.be.false;
    });
    it("should thow an error when the first or second argument is missing", () => {
      expect(() => {
        strings.endsWith();
      }).to.throw(TypeError);
      expect(() => {
        strings.endsWith("");
      }).to.throw(TypeError);
    });
  });

  describe("#fromCharCode(num1[, ...[, numN]])", () => {
    it("should return a string created from a sequence of UTF-16 code units", () => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
      expect(strings.fromCharCode(65, 66, 67)).to.eql("ABC");
      expect(strings.fromCharCode(0x2014)).to.eql("—");
      expect(strings.fromCharCode(0x12014)).to.eql("—"); // The digit 1 is truncated and ignored.
    });
  });

  describe("#isString(object)", () => {
    it("should operate normally", () => {
      // To enumerate the possibilites here, I used the possible return values
      // of typeof as inspiration:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
      expect(strings.isString("")).to.be.true;
      expect(strings.isString("frog")).to.be.true;
      expect(strings.isString(new String("cat"))).to.be.true;
      expect(strings.isString()).to.be.false;
      expect(strings.isString(null)).to.be.false;
      expect(strings.isString(false)).to.be.false;
      expect(strings.isString(0)).to.be.false;
      expect(
        strings.isString(() => {
          return "";
        })
      ).to.be.false;
      expect(strings.isString({})).to.be.false;
    });
  });

  describe("#pad(n, width, z)", () => {
    it("should operate normally", () => {
      expect(strings.pad("frog", 3)).to.equal("frog");
      expect(strings.pad("frog", 4)).to.equal("frog");
      expect(strings.pad("frog", 6)).to.equal("00frog");
      expect(strings.pad(123456, 3)).to.equal("123456");
      expect(strings.pad(123456, 6)).to.equal("123456");
      expect(strings.pad(123456, 10)).to.equal("0000123456");
      expect(strings.pad("frog", 3, 5)).to.equal("frog");
      expect(strings.pad("frog", 4, 5)).to.equal("frog");
      expect(strings.pad("frog", 6, 5)).to.equal("55frog");
      expect(strings.pad(123456, 3, 5)).to.equal("123456");
      expect(strings.pad(123456, 6, 5)).to.equal("123456");
      expect(strings.pad(123456, 10, 5)).to.equal("5555123456");
    });
    it("should return the original string if width is not positive", () => {
      expect(strings.pad("frog", 0)).to.equal("frog");
      expect(strings.pad("frog", -3)).to.equal("frog");
      expect(strings.pad("frog", -4)).to.equal("frog");
      expect(strings.pad("frog", -6)).to.equal("frog");
    });
    it("should use a padding character of '0' when the padding character is the empty string", () => {
      expect(strings.pad("frog", 3, "")).to.equal("frog");
      expect(strings.pad("frog", 4, "")).to.equal("frog");
      expect(strings.pad("frog", 6, "")).to.equal("00frog");
      expect(strings.pad(123456, 3, "")).to.equal("123456");
      expect(strings.pad(123456, 6, "")).to.equal("123456");
      expect(strings.pad(123456, 10, "")).to.equal("0000123456");
    });
    it("should throw an error when the padding character's length is not 1", () => {
      expect(() => {
        strings.pad("frog", 6, 57);
      }).to.throw(Error);
      expect(() => {
        strings.pad(123456, 10, 57);
      }).to.throw(Error);
    });
  });

  describe("#stripTags(str)", () => {
    it("should operate normally", () => {
      expect(strings.stripTags("frog")).to.equal("frog");
      expect(
        strings.stripTags('<html><>frog</html><span style=""> </span>')
      ).to.equal("<>frog ");
    });
    it("should throw an error if any argument is null", () => {
      expect(() => string.stripTags()).to.throw(ReferenceError);
    });
  });
});
