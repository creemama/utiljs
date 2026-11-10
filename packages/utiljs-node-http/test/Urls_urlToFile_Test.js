import { describe, it } from "node:test";
import { expect } from "chai";
import Files from "@util.js/node-files";
import Urls from "../index.js";

const targetDir = Files.join(import.meta.dirname, "..", "target");
let fileNum = 0;

describe("Urls#urlToFile", () => {
  it("downloads a valid URL to a local file", { timeout: 5000 }, async () => {
    await Files.mkdirp(targetDir);
    const destination = Files.join(
      targetDir,
      Files.sanitizeFilename(`${fileNum++}.urlToFile.google.html`, {
        replacement: "_",
      }),
    );

    await Urls.urlToFile({
      file: destination,
      url: "https://www.google.com",
    });

    const content = await Files.readFile(destination, "utf8");
    expect(content.startsWith("<!doctype html>") || content.startsWith("<html"))
      .to.be.true;
  });

  it("throws a TypeError on invalid URLs", { timeout: 2000 }, async () => {
    try {
      await Urls.urlToFile({
        file: "somefile.html",
        url: "not-a-valid-url",
      });
      throw new Error("Unexpected success");
    } catch (error) {
      expect(error).to.be.an.instanceof(TypeError);
    }
  });

  it("handles empty or undefined params", async () => {
    const methods = [() => Urls.urlToFile(undefined), () => Urls.urlToFile({})];

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
