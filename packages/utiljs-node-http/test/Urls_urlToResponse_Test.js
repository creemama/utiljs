import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#urlToResponse", () => {
  it(
    "proxies URL content to a mock web response",
    { timeout: 5000 },
    async () => {
      let headersSet = false;
      let dataWritten = false;
      let ended = false;

      const { PassThrough } = await import("node:stream");
      const mockResponse = new PassThrough();

      mockResponse.setHeader = function (key, value) {
        this.headers = this.headers || {};
        this.headers[key] = value;
      };

      mockResponse.set = function (headers) {
        headersSet = true;
        expect(headers).to.be.an("object");
        for (const [key, value] of Object.entries(headers)) {
          this.setHeader(key, value);
        }
      };

      mockResponse.on("data", (chunk) => {
        if (chunk.length > 0) dataWritten = true;
      });

      mockResponse.on("finish", () => {
        ended = true;
      });

      await Urls.urlToResponse({
        response: mockResponse,
        url: "https://www.google.com",
      });

      expect(headersSet).to.be.true;
      expect(dataWritten).to.be.true;
      expect(ended).to.be.true;
    },
  );

  it("handles empty or undefined params", async () => {
    const methods = [
      () => Urls.urlToResponse(undefined),
      () => Urls.urlToResponse({}),
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
