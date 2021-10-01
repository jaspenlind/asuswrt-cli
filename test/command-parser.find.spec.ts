import commandParser from "../src/lib/parsers/command.parser";
import declaration, { CommandDeclaration } from "../src/models/command-declaration";

describe("commandParser", () => {
  describe("find", () => {
    it("can find firewall command", () => {
      const firewall = "firewall";
      const result = commandParser(firewall).find();

      expect(result).not.toBe(declaration.empty);

      expect(result.name).toBe(firewall);
      expect(result.subCommands).not.toBeEmpty();
    });

    it("can pass arguments to command", () => {
      const command = commandParser("firewall", "stats").find();

      expect(command.args).toContain("stats");
      expect(command.args).toHaveLength(1);
    });

    it("can find info command", () => {
      const info = "info";
      const result = commandParser(info).find();

      expect(result.name).toBe(info);
      expect(result.subCommands).not.toBeEmpty();
    });

    it("can find terminal command", () => {
      const terminal = "terminal";
      const result = commandParser(terminal).find();

      expect(result.name).toBe(terminal);
      expect(result.fullName).toBe(terminal);
      expect(result.subCommands).toBeEmpty();
    });

    it("can find sub commands", () => {
      const level1 = "info";
      const level2 = "uptime";
      const result = commandParser(level1, level2).find();

      expect(result.name).toBe(level2);
      expect(result.fullName).toBe(`${level1} ${level2}`);
    });

    it("can find job add command with id", () => {
      const command = commandParser("jobs", "add", "id").find() as CommandDeclaration;

      expect(command).not.toBeNull();

      expect(command.fullName).toBe("jobs add");

      expect(command.args).toHaveLength(1);
    });
  });
});
