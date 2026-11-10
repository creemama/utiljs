import { describe, it } from "node:test";
import { expect } from "chai";
import Urls from "../index.js";

describe("Urls#encodeURI", () => {
  it("should encode and decode URIs correctly", () => {
    const encoded = "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B";
    const decoded = "https://mozilla.org/?x=шеллы";
    expect(Urls.encodeURI(decoded)).to.eql(encoded);
  });
});
