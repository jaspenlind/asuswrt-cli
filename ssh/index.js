const node_ssh = require("node-ssh");
const settings = require("./config");

const useClient = async callback => {
  if (callback === undefined) {
    throw new Error("callback not specified");
  }

  let ssh;

  try {
    ssh = new node_ssh();
    await ssh.connect(settings);
    await callback(ssh);
  } finally {
    if (ssh) {
      ssh.dispose();
    }
  }
};

module.exports = {
  use: useClient
};
