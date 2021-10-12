import flexi from "flexi-path";
import { PromptType } from "../../../src/types";
import { prompt, promptTypes } from "../../../src/lib/ssh/config";

const messages: string[] = [];

const setup = () => {
  jest.spyOn(promptTypes, "get").mockImplementation((type: PromptType) =>
    jest.fn((message: string) => {
      messages.push(message);

      if (type === PromptType.Confirm) {
        return Promise.resolve(true);
      }

      return Promise.resolve("test");
    })
  );
};

afterEach(() => {
  messages.length = 0;
  jest.restoreAllMocks();
});

describe("ssh", () => {
  describe("config", () => {
    describe("prompt", () => {
      it("should ask for router address", () => {
        setup();

        return prompt().then(() => {
          expect(messages.find((x) => x.startsWith("Router address"))).toBeDefined();
        });
      });

      it("should ask for user name", () => {
        setup();

        return prompt().then(() => {
          expect(messages.find((x) => x.startsWith("User name"))).toBeDefined();
        });
      });

      it("should ask for private key", () => {
        setup();

        return prompt().then(() => {
          expect(messages.find((x) => x.startsWith("SSH private key file"))).toBeDefined();
        });
      });

      it("should ask for passphrase", () => {
        setup();

        return prompt().then(() => {
          expect(messages.find((x) => x.startsWith("Passphrase"))).toBeDefined();
        });
      });

      it("should ask for creating key file when not exists", () => {
        jest.spyOn(flexi, "exists").mockImplementationOnce(() => false);

        setup();

        return prompt().then(() => {
          expect(messages.find((x) => x.match("does not exist"))).toBeDefined();
        });
      });

      it("should not ask for creating key file when exists", () => {
        jest.spyOn(flexi, "exists").mockImplementationOnce(() => true);

        setup();

        return prompt().then(() => {
          expect(messages.find((x) => x.match("does not exist"))).toBeUndefined();
        });
      });
    });
  });
});
