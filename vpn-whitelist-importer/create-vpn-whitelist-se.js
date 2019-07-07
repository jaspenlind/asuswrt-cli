const request = require("request");
const fs = require("fs");

request("https://api.nordvpn.com/server", { json: true }, (err, response, body) => {
  if (err) {
    return console.log(err);
  }

  const ips = body
    .filter(x => x.country === "Sweden")
    .map(x => x.ip_address)
    .join("\n");

  fs.writeFile("vpn-whitelist-se.txt", ips, e => {
    if (e) console.error(e);
  });
});
