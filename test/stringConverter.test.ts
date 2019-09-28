import {
  convert,
  StringConvertible,
  convertToNumber,
  convertToBoolean,
  convertToString
} from "../src/lib/stringConverter";

const toStringFunc = (): StringConvertible => {
  return {
    toString: () => "some string"
  };
};

describe("stringConverter", () => {
  describe("convert", () => {
    it("can convert to number", () => {
      expect(typeof convert("42")).toBe("number");
    });

    it("can convert to boolean", () => {
      expect(typeof convert("true")).toBe("boolean");
    });

    it("can convert to string", () => {
      expect(typeof convert(toStringFunc())).toBe("string");
    });

    it("can handle undefined", () => {
      expect(convert(undefined)).toBeUndefined();
    });
  });

  describe("convertToNumber", () => {
    it("can convert to number", () => {
      expect(convertToNumber(42)).toBe(42);
    });

    it("can handle undefined", () => {
      expect(convertToNumber(undefined)).toBeUndefined();
    });
  });

  describe("convertToBoolean", () => {
    it("can convert truthy values", () => {
      expect(convertToBoolean("true")).toBe(true);
      expect(convertToBoolean("True")).toBe(true);
      expect(convertToBoolean("1")).toBe(true);
    });

    it("can convert falsy values", () => {
      expect(convertToBoolean("false")).toBe(false);
      expect(convertToBoolean("False")).toBe(false);
      expect(convertToBoolean("0")).toBe(false);
    });

    it("can handle undefined", () => {
      expect(convertToBoolean(undefined)).toBeUndefined();
    });
  });

  describe("convertToString", () => {
    it("can convert StringConvertible", () => {
      expect(convertToString(toStringFunc())).toBeDefined();
    });

    it("can return string", () => {
      expect(convertToString("str")).toBe("str");
    });

    it("can handle undefined", () => {
      expect(convertToString(undefined)).toBeUndefined();
    });
  });
});
