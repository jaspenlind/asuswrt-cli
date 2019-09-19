import check from "../../src/lib/ssh/config/check";

jest.unmock("promptly");
jest.unmock("../../src/lib/ssh/config");

// eslint-disable-next-line
const promptly = require("promptly");
// eslint-disable-next-line
const config = require("../../src/lib/ssh/config");

describe("ssh", () => {
  describe("config", () => {
    it("should be true when config exists", async () => {
      config.exists = jest.fn(() => true);

      const configExists = await check();

      expect(configExists).toBeTrue();
    });

    it("can should be false when skipping creating config", () => {
      config.exists = jest.fn(() => false);
      promptly.confirm = jest.fn(() => Promise.resolve<boolean>(false));

      return expect(check()).resolves.toBeFalse();
    });

    it("should reject when prompt fails", () => {
      config.exists = jest.fn(() => false);
      promptly.confirm = jest.fn(() => Promise.resolve<boolean>(true));
      config.prompt = jest.fn(() => Promise.reject(new Error("error")));

      return expect(check()).toReject();
    });
  });
});
