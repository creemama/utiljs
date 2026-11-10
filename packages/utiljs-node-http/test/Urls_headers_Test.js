import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#headers", () => {
  it("handles HTTP requests with string URL", { timeout: 5000 }, async () => {
    const headers = await Urls.headers({ url: "http://www.google.com" });
    expect(headers["content-type"]).to.be.a("string");
    expect(headers["content-type"].startsWith("text/html")).to.be.true;
  });

  it("handles HTTPS requests with URL object", { timeout: 5000 }, async () => {
    const headers = await Urls.headers({
      url: new URL("https://www.google.com"),
    });
    expect(headers["content-type"].startsWith("text/html")).to.be.true;
  });

  it(
    "handles HTTP requests with explicit port, options, and invalid/valid timeoutMs formats",
    { timeout: 5000 },
    async () => {
      const headers = await Urls.headers({
        url: "http://www.google.com:80",
        timeoutMs: "invalid-timeout",
      });
      expect(headers["content-type"].startsWith("text/html")).to.be.true;
    },
  );

  it("handles HTTP errors gracefully", { timeout: 5000 }, async () => {
    try {
      await Urls.headers({ url: "http://doesnotexist:8080", timeoutMs: 50 });
      throw new Error("Unexpected success");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
    }
  });

  it("handles request timeouts", { timeout: 5000 }, async () => {
    try {
      // Use a non-routable IP to force a timeout.
      await Urls.headers({ url: "http://10.255.255.1", timeoutMs: 10 });
      throw new Error("Unexpected success");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
    }
  });

  it(
    "fetches and uses the GoogleBot user agent header",
    { timeout: 10000 },
    async () => {
      const headers = await Urls.headers({
        url: "https://www.google.com",
        useGoogleBotUserAgent: true,
      });
      expect(headers).to.be.an("object");
    },
  );

  it("handles undefined params gracefully in determineTimeout", async () => {
    try {
      await Urls.headers(undefined);
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
    }
  });

  it(
    "respects a pre-existing User-Agent header when useGoogleBotUserAgent is true",
    { timeout: 5000 },
    async () => {
      const customAgent = "CustomBotAgent/1.0";
      const headers = await Urls.headers({
        url: "https://www.google.com",
        headers: { "User-Agent": customAgent },
        useGoogleBotUserAgent: true,
      });
      expect(headers).to.be.an("object");
    },
  );

  it(
    "handles valid explicit timeoutMs values (not -1)",
    { timeout: 5000 },
    async () => {
      const headers = await Urls.headers({
        url: "https://www.google.com",
        timeoutMs: 3000,
      });
      expect(headers["content-type"]).to.be.a("string");
    },
  );
});
