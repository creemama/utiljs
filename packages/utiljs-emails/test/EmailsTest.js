"use strict";

const emails = require(".."),
  { expect } = require("chai");

describe("Emails", () => {
  describe("#isValidEmail(str)", () => {
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
});
