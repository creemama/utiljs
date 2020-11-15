"use strict";

const emails = require(".."),
  { expect } = require("chai");

describe("Emails", () => {
  describe("#isValidEmail(string)", () => {
    it("should validate foo-bar.baz@example.com", () => {
      expect(emails.isValidEmail("foo-bar.baz@example.com")).to.be.true;
    });
    it("should validate a@a", () => {
      expect(emails.isValidEmail("a@a")).to.be.true;
    });
    it("should invalidate foo-bar.bazexample.com", () => {
      expect(emails.isValidEmail("foo-bar.bazexample.com")).to.be.false;
    });
    it("should invalidate a@", () => {
      expect(emails.isValidEmail("a@")).to.be.false;
    });
    it("should invalidate @b", () => {
      expect(emails.isValidEmail("a@")).to.be.false;
    });
    it("should invalidate null", () => {
      expect(emails.isValidEmail(null)).to.be.false;
    });
    it("should validate the array ['foo-bar.baz@example.com']", () => {
      expect(emails.isValidEmail(["foo-bar.baz@example.com"])).to.be.true;
    });
    it("should invalidate the array ['foo-bar.baz@example.com', 'a@a']", () => {
      expect(emails.isValidEmail(["foo-bar.baz@example.com", "a@a"])).to.be
        .false;
    });
  });

  describe("#wrapHeaders(nameValueArrayOfHeaders)", () => {
    it("should return a valid EmailHeaders instance", () => {
      const nameValueArrayOfHeaders = [
        { name: "Delivered-To", value: "c@creemama.com" },
        { name: "Date", value: "Tue, 10 Jul 2018 10:18:52 -0700" },
        { name: "To", value: "Chris Topher <c@creemama.com>" },
      ];

      const headers = emails.wrapHeaders(nameValueArrayOfHeaders);

      expect(headers.deliveredTo()).to.eql("c@creemama.com");
      expect(headers.from()).to.be.undefined;
      expect(headers.get("Date")).to.eql("Tue, 10 Jul 2018 10:18:52 -0700");
      expect(headers.get("date")).to.eql("Tue, 10 Jul 2018 10:18:52 -0700");
      expect(() => headers.get()).to.throw(TypeError);
      expect(() => headers.get(null)).to.throw(TypeError);
      expect(() => headers.get({})).to.throw(TypeError);
      expect(() => headers.get(5)).to.throw(TypeError);
      expect(headers.inReplyTo()).to.be.undefined;
      expect(headers.messageId()).to.be.undefined;
      expect(headers.references()).to.be.undefined;
      expect(headers.subject()).to.be.undefined;
      expect(headers.to()).to.eql("Chris Topher <c@creemama.com>");
      expect(headers.toString()).to.eql(
        "EmailHeaders {\n" +
          '  "Delivered-To": "c@creemama.com",\n' +
          '  "Date": "Tue, 10 Jul 2018 10:18:52 -0700",\n' +
          '  "To": "Chris Topher <c@creemama.com>"\n' +
          "}"
      );
    });
    it("should throw a TypeError if nameValueArrayOfHeaders is not an array-like object containing name-value objects", () => {
      expect(() => emails.wrapHeaders()).to.throw(TypeError);
      expect(() => emails.wrapHeaders(null)).to.throw(TypeError);
      expect(() => emails.wrapHeaders(5)).to.throw(TypeError);
      expect(() => emails.wrapHeaders([0, "a", "b"])).to.throw(TypeError);
    });
  });
});
