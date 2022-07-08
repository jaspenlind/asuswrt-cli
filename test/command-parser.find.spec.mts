import { parse } from "../src/lib/parsers/command.parser.mjs";
import { empty } from "../src/models/command-declaration.mjs";
import { CommandDeclaration } from "../src/types/index.mjs";

describe("commandParser", () => {
  describe("find", () => {
    it("can find firewall command", async () => {
      const firewall = "firewall";
      const result = await parse(firewall);

      expect(result).not.toBe(empty);

      expect(result.name).toBe(firewall);
      expect(result.subCommands).not.toBeEmpty();
    });

    it("can pass arguments to command", async () => {
      const command = await parse("firewall", "stats");

      expect(command.args).toContain("stats");
      expect(command.args).toHaveLength(1);
    });

    it("can find info command", async () => {
      const info = "info";
      const result = await parse(info);

      expect(result.name).toBe(info);
      expect(result.subCommands).not.toBeEmpty();
    });

    it("can find terminal command", async () => {
      const terminal = "terminal";
      const result = await parse(terminal);

      expect(result.name).toBe(terminal);
      expect(result.fullName).toBe(terminal);
      expect(result.subCommands).toBeEmpty();
    });

    it("can find sub commands", async () => {
      const level1 = "info";
      const level2 = "uptime";
      const result = await parse(level1, level2);

      expect(result.name).toBe(level2);
      expect(result.fullName).toBe(`${level1} ${level2}`);
    });

    it("can find job add command with id", async () => {
      const command = await parse("jobs", "add", "id");

      expect(command).not.toBeNull();

      expect(command.fullName).toBe("jobs add");

      expect(command.args).toHaveLength(1);
    });
  });
});
