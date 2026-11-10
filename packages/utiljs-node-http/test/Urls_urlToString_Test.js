import { describe, it } from "node:test";
import { expect } from "chai";
import urls from "../index.js";

describe("Urls#urlToString", () => {
  it("converts URL content to a string", { timeout: 5000 }, async () => {
    const str = await urls.urlToString({ url: "https://www.google.com" });
    expect(str).to.be.a("string");
    expect(str.length).to.be.greaterThan(0);
  });

  it("converts URL content to a string with charset auto-detection or explicit encoding", async () => {
    // Test default/auto-detection.
    const str = await urls.urlToString({ url: "https://www.google.com" });
    expect(str).to.be.a("string");

    // Test explicit encoding override.
    const strWithEncoding = await urls.urlToString({
      url: "https://www.google.com",
      encoding: "utf-8",
    });
    expect(strWithEncoding).to.be.a("string");
  });

  it("handles empty or undefined params", async () => {
    const methods = [
      () => urls.urlToString(undefined),
      () => urls.urlToString({}),
    ];

    for (const fn of methods) {
      try {
        await fn();
        expect.fail(
          "Expected method to throw an error for empty/undefined params",
        );
      } catch (error) {
        expect(error).to.be.an.instanceof(Error);
      }
    }
  });
});
