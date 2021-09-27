import cli from "../src/lib/cli";
import config from "../src/lib/ssh/config";

/* eslint-disable */
const command = require("../src/lib/commands/info/uptime");
const header = require("../src/resources/header");
const help = require("../src/lib/help");
/* eslint-enable */

beforeEach(() => {
  header.default = jest.fn();
  help.default = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("cli", () => {
  describe("run", () => {
    it("should show header", () => {
      console.error = jest.fn();
      cli.run();

      expect(header.default).toHaveBeenCalled();
    });

    it("should show help when help option specified", () => {
      cli.run("-h");

      expect(help.default).toHaveBeenCalled();
    });

    it("should show help when no command specified", () => {
      cli.run();

      expect(help.default).toHaveBeenCalled();
    });

    it("should show error when invalid command specified", () => {
      const spy = jest.spyOn(console, "error").mockImplementation();

      cli.run("invalid");

      expect(spy).toHaveBeenCalled();
    });

    it("should show help when invalid command specified", () => {
      const spy = jest.spyOn(help, "default").mockImplementation();

      cli.run("invalid");

      expect(spy).toHaveBeenCalled();
    });

    it("should check config when valid command specified", () => {
      command.default = { run: jest.fn() };
      config.check = jest.fn(() => Promise.resolve(true));

      cli.run("info", "uptime");

      expect(config.check).toHaveBeenCalled();
    });

    // eslint-disable-next-line jest/expect-expect
    it.todo("should run command when config check is ok");

    it("should show error when config check not ok", () => {
      const spy = jest.spyOn(console, "log").mockImplementation();

      config.check = jest.fn(() => Promise.reject(new Error("error")));

      cli.run("info", "uptime");

      expect(spy).toHaveBeenCalled();
    });

    // eslint-disable-next-line jest/expect-expect
    it.todo("should not run command when config check is not ok");
  });
});
