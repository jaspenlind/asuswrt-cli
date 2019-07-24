const client = require("../ssh");
const dateFormat = require("./dateFormat");

const getDeviceBlockSummary = async (ssh, date) => {
  return ssh.execCommand(`sh /jffs/scripts/device-blocks ${date}`, {});
};

const handleHelp = () => {
  let showHelp = process.argv[2] === "--help" || process.argv[2] === "-h";

  if (showHelp) {
    console.log("Usage: node index.js [YYYY-MM-dd]");
    process.exit(0);
  }
};

(async () => {
  handleHelp();

  client.use(async ssh => {
    let date = process.argv[2] || dateFormat.yesterday();

    console.log(`Device blocks ${date}`);
    console.log("========================");

    let result = await getDeviceBlockSummary(ssh, date);

    console.log(result.stdout);

    if (result.stderr) {
      console.error(result.stderr);
      return;
    }
  });
})();
