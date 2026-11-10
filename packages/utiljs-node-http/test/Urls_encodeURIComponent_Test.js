import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#encodeURIComponent", () => {
  it("should encode and decode URI components correctly", () => {
    const encoded = "JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B";
    const decoded = "JavaScript_шеллы";
    expect(Urls.encodeURIComponent(decoded)).to.eql(encoded);
  });
});
