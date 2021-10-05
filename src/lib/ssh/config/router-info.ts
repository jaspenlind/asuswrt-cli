export const routerInfo = (publicKey?: string): void => {
  console.log(`
To use this CLI you need to enable SSH in your router.

If you haven't already done that, follow these steps to enable SSH:
1. Open the router web interface and go to Administration / System
2. Set Enable SSH to 'LAN Only'
3. Set Allow Password Login to 'No'
4. Paste the public key below into the Authorized Keys field
5. Click Apply`);

  if (publicKey) {
    console.log(`
  Public key:
  ${publicKey}`);
  }
};

export default routerInfo;
