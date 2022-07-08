import { routerInfo } from "../../../src/lib/ssh/config/router-info.mjs";

describe("ssh", () => {
  describe("config", () => {
    describe("routerInfo", () => {
      it("can show router info", () => {
        console.log = jest.fn();

        routerInfo();

        expect(console.log).toHaveBeenCalled();
      });

      it("can include public key", () => {
        let publicKeyIncluded = false;
        const publicKey = "pubKey";

        console.log = jest.fn((message: string) => {
          publicKeyIncluded = message.indexOf(publicKey) > 0;
        });

        routerInfo(publicKey);

        expect(publicKeyIncluded).toBe(true);
      });
    });
  });
});
