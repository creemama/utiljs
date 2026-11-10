import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#urlToData", () => {
  it("retrieves URL content as data chunks", { timeout: 5000 }, async () => {
    const chunks = await Urls.urlToData({ url: "https://www.google.com" });
    expect(Array.isArray(chunks)).to.be.true;
    expect(chunks.length).to.be.greaterThan(0);
    expect(Buffer.isBuffer(chunks[0])).to.be.true;
  });

  it("handles empty or undefined params", async () => {
    const methods = [() => Urls.urlToData(undefined), () => Urls.urlToData({})];

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
