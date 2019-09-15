import commandParser from "../../src/common/commandParser";

describe("commandParser", () => {
  describe("all", () => {
    it("should return commands", () => {
      expect(commandParser("").all().length).toBeGreaterThan(1);
    });
  });
});
