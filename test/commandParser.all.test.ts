import commandParser from "../src/lib/commandParser";

describe("commandParser", () => {
  describe("all", () => {
    it("should have firewall command", () => {
      const result = commandParser()
        .all()
        .find(x => x.name === "firewall");

      expect(result).toBeDefined();
    });

    it("should have info command", () => {
      const result = commandParser()
        .all()
        .find(x => x.name === "info");

      expect(result).toBeDefined();
    });

    it("should have terminal command", () => {
      const result = commandParser()
        .all()
        .find(x => x.name === "terminal");

      expect(result).toBeDefined();
    });
  });
});
