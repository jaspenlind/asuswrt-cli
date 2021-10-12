import { parse, StringComparison } from "../../src/lib/helpers/enum.helpers";

// eslint-disable-next-line no-shadow
enum TestEnum {
  First,
  Second
}

describe("enumHelper", () => {
  describe("parse", () => {
    it("should have hasValue set to true when value matches enum value", () => {
      expect(parse(TestEnum, "Second").hasValue).toBe(true);
    });

    it("should have hasValue set to false when value matches enum value with other casing", () => {
      expect(parse(TestEnum, "sEcONd").hasValue).toBe(false);
    });

    it("should have hasValue set to true when value matches enum value and ignoring case", () => {
      expect(parse(TestEnum, "second", StringComparison.OrdinalIgnoreCase).hasValue).toBe(true);
    });

    it("should have hasValue set to false when value is invalid", () => {
      expect(parse(TestEnum, "invalid").hasValue).toBe(false);
    });

    it("should have value defined", () => {
      expect(parse(TestEnum, "Second").value).toBeDefined();
      expect(parse(TestEnum, "second", StringComparison.OrdinalIgnoreCase).value).toBeDefined();
    });

    it("should have value undefined", () => {
      expect(parse(TestEnum, "invalid").value).toBeUndefined();
      expect(parse(TestEnum, "second", StringComparison.Ordinal).value).toBeUndefined();
    });
  });
});
