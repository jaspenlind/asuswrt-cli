const fs = require("fs");
const path = require("path");

const getConfig = () => {
  let configFile = path.join(__dirname, ".ssh.config");

  if (!fs.existsSync(configFile)) {
    throw new Error(`SSH config file '${configFile}' does not exist!`);
  }

  let content = fs.readFileSync(configFile, { encoding: "utf-8" });

  let rows = content.split("\n");

  var config = {};

  for (let row of rows) {
    if (row !== "") {
      var item = row.split("=");
      config[item[0]] = item[1].replace(/\"/g, "");
    }
  }
  return config;
};

module.exports = getConfig();
