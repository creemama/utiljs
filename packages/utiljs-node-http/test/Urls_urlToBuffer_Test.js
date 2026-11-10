import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#urlToBuffer", () => {
  it("converts URL content to a Buffer", { timeout: 5000 }, async () => {
    const buf = await Urls.urlToBuffer({ url: "https://www.google.com" });
    expect(Buffer.isBuffer(buf)).to.be.true;
    expect(buf.length).to.be.greaterThan(0);
  });

  it("handles empty or undefined params gracefully", async () => {
    const methods = [
      () => Urls.urlToBuffer(undefined),
      () => Urls.urlToBuffer({}),
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
