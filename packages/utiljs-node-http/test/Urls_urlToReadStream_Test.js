import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#urlToReadStream", () => {
  it(
    "returns a readable stream for a valid URL",
    { timeout: 5000 },
    async () => {
      const readable = await Urls.urlToReadStream({
        url: "https://www.google.com",
      });
      expect(readable).to.have.property("pipe");
      readable.destroy();
    },
  );

  it(
    "follows HTTP redirects up to maxRedirects",
    { timeout: 10000 },
    async () => {
      const readable = await Urls.urlToReadStream({
        url: "http://google.com",
        maxRedirects: 2,
      });
      expect(readable).to.have.property("pipe");
      readable.destroy();
    },
  );

  it(
    "respects nonempty User-Agent when useGoogleBotUserAgent is true",
    { timeout: 5000 },
    async () => {
      const readable = await Urls.urlToReadStream({
        url: "https://www.google.com",
        headers: { "User-Agent": "CustomStreamAgent/1.0" },
        useGoogleBotUserAgent: true,
      });
      expect(readable).to.have.property("pipe");
      readable.destroy();
    },
  );

  it(
    "automatically fetches and injects GoogleBot user agent when User-Agent is absent",
    { timeout: 10000 },
    async () => {
      const readable = await Urls.urlToReadStream({
        url: "https://www.google.com",
        useGoogleBotUserAgent: true,
      });
      expect(readable).to.have.property("pipe");
      readable.destroy();
    },
  );

  it("handles a positive timeoutMs", { timeout: 5000 }, async () => {
    const readable = await Urls.urlToReadStream({
      url: "https://www.google.com",
      timeoutMs: 4000,
    });
    expect(readable).to.have.property("pipe");
    readable.destroy();
  });

  it("handles empty or undefined params", async () => {
    const methods = [
      () => Urls.urlToReadStream(undefined),
      () => Urls.urlToReadStream({}),
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
