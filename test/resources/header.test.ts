import { version } from "../../package.json";
import header from "../../src/resources/header";

describe("header", () => {
  it("can read header", () => {
    expect(header()).not.toBeEmpty();
  });

  it("should include version", () => {
    const head = header();

    expect(head).toMatch(version);
  });
});
