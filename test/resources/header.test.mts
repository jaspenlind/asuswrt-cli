import { json } from "../../src/lib/parsers/index.mjs";
import { header } from "../../src/resources/header.mjs";

describe("header", () => {
  it("can read header", () => {
    expect(header()).not.toBeEmpty();
  });

  it("should include version", () => {
    const head = header();

    const { version } = json.parse("../../package.json");
    expect(head).toMatch(version);
  });
});
