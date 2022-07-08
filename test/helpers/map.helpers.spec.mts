import { swap } from "../../src/lib/helpers/map.helpers.mjs";

describe("mapHelper", () => {
  describe("swap", () => {
    it("can swap keys with values", () => {
      const map = new Map<string, string>([
        ["key1", "value1"],
        ["key2", "value2"]
      ]);

      const result = swap(map);

      expect(result.size).toBe(2);
      expect(result.get("value1")).toBe("key1");
      expect(result.get("value2")).toBe("key2");
    });
  });
});
