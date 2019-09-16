import commandParser from "../src/lib/commandParser";
import { Command } from "../src/types";

describe("commandParser", () => {
  describe("find", () => {
    it("can find firewall command", () => {
      const firewall = "firewall";
      const result = commandParser(firewall).find();

      expect(result).toBeDefined();

      const firewallCommand = result as Command;

      expect(firewallCommand.name).toBe(firewall);
      expect(firewallCommand.subCommands).not.toBeEmpty();
    });

    it("can find info command", () => {
      const info = "info";
      const result = commandParser(info).find();

      expect(result).toBeDefined();

      const infoCommand = result as Command;

      expect(infoCommand.name).toBe(info);
      expect(infoCommand.subCommands).not.toBeEmpty();
    });

    it("can find terminal command", () => {
      const terminal = "terminal";
      const result = commandParser(terminal).find();

      expect(result).toBeDefined();

      const terminalCommand = result as Command;

      expect(terminalCommand.name).toBe(terminal);
      expect(terminalCommand.fullname).toBe(terminal);
      expect(terminalCommand.subCommands).toBeEmpty();
    });

    it("can find sub commands", () => {
      const level1 = "info";
      const level2 = "uptime";
      const result = commandParser(level1, level2).find();

      expect(result).toBeDefined();

      const uptimeCommand = result as Command;

      expect(uptimeCommand.name).toBe(level2);
      expect(uptimeCommand.fullname).toBe(`${level1} ${level2}`);
    });
  });
});
