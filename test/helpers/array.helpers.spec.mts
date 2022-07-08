import { any, isEmpty, last } from "../../src/lib/helpers/array.helpers.mjs";

describe("arrayHelper", () => {
  describe("any", () => {
    it("should be true when array is not empty", () => {
      expect(any(["item"])).toBe(true);
    });

    it("should be false when array is empty", () => {
      expect(any([])).toBe(false);
    });
  });

  describe("isEmpty", () => {
    it("should be true when array is empty", () => {
      expect(isEmpty([])).toBe(true);
    });

    it("should be false when array is not empty", () => {
      expect(isEmpty(["item"])).toBe(false);
    });
  });

  describe("last", () => {
    it("should be last item of array", () => {
      const lastItem = "last";

      expect(last(["first", "second", lastItem])).toBe(lastItem);
    });

    it("should be null when array is empty", () => {
      expect(last([])).toBeNull();
    });
  });
});
