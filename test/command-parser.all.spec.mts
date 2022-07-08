import { all } from "../src/lib/parsers/command.parser.mjs";

describe("commandParser", () => {
  describe("all", () => {
    it("should have firewall command", async () => {
      const allCommands = await all();
      const result = allCommands.filter((x) => x.name === "firewall");

      expect(result).toBeDefined();
    });

    it("should have info command", async () => {
      const allCommands = await all();
      const result = allCommands.filter((x) => x.name === "info");

      expect(result).toBeDefined();
    });

    it("should have terminal command", async () => {
      const allCommands = await all();
      const result = allCommands.filter((x) => x.name === "terminal");

      expect(result).toBeDefined();
    });
  });
});
