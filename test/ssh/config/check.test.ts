import check from "../../../src/lib/ssh/config/check";

/* eslint-disable @typescript-eslint/no-var-requires */
const promptly = require("promptly");
const config = require("../../../src/lib/ssh/config");
/* eslint-enable @typescript-eslint/no-var-requires */

afterAll(() => {
  jest.restoreAllMocks();
});

describe("ssh", () => {
  describe("config", () => {
    describe("check", () => {
      it("should be true when config exists", async () => {
        config.exists = jest.fn(() => true);

        return expect(check()).resolves.toBeTrue();
      });

      it("should be false when skip create", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(false));

        return expect(check()).resolves.toBeFalse();
      });

      it("should prompt for details", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(true));
        config.set = jest.fn();
        config.routerInfo = jest.fn();

        config.prompt = jest.fn(() => Promise.resolve({}));

        return check().then(() => expect(config.prompt).toHaveBeenCalled());
      });

      it("should reject when prompt fails", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(true));
        config.set = jest.fn();
        config.routerInfo = jest.fn();

        config.prompt = jest.fn(() => {
          throw new Error("fail");
        });

        return expect(check()).toReject();
      });

      it("should write new config", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(true));
        config.routerInfo = jest.fn();
        config.prompt = jest.fn(() => Promise.resolve({}));

        config.set = jest.fn();

        return check().then(() => {
          expect(config.set).toHaveBeenCalled();
        });
      });

      it("should generate SSH key file if wanted", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(true));
        config.routerInfo = jest.fn();
        config.prompt = jest.fn(() => Promise.resolve({ createKeyFile: true }));
        config.set = jest.fn();

        config.generateSshKey = jest.fn(() => Promise.resolve({}));

        return check().then(() => {
          expect(config.generateSshKey).toHaveBeenCalled();
        });
      });

      it("should not generate SSH key file when not wanted", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(true));
        config.routerInfo = jest.fn();
        config.prompt = jest.fn(() =>
          Promise.resolve({ createKeyFile: false })
        );
        config.set = jest.fn();

        config.generateSshKey = jest.fn();

        return check().then(() => {
          expect(config.generateSshKey).not.toHaveBeenCalled();
        });
      });

      it("should display router setup instructions when done", () => {
        config.exists = jest.fn(() => false);
        promptly.confirm = jest.fn(() => Promise.resolve(true));
        config.routerInfo = jest.fn();
        config.prompt = jest.fn(() =>
          Promise.resolve({ createKeyFile: false })
        );
        config.set = jest.fn();

        config.routerInfo = jest.fn();

        return check().then(() => {
          expect(config.routerInfo).toHaveBeenCalled();
        });
      });
    });
  });
});
