import { parse } from "args-any";
import promptly from "promptly";
import { table } from "table";
import vpn from "nordvpn-server-lister";

import { skynetCommand } from "../../../models/command";

const description = "Import vpn endpoints";
const hint = "[-country <ISO 2-letter country code>";

interface FilterModel {
  country: string;
}

const run = async (...args: string[]) => {
  const filter = parse(args).asPartial<FilterModel>();

  const country = filter.country || (await promptly.prompt("Country"));

  const result = await vpn.fetch().then(response => response.items.filter(x => x.country === country));

  const data = result.map(x => ({ ip: x.ip_address, name: x.name }));

  const tabular = data.map(x => {
    return Object.values(x);
  });

  tabular.unshift(["ip", "name"]);

  console.log(table(tabular));

  await promptly.confirm("Add the following exceptions to the firewall?");

  console.log("todo");
};

export default skynetCommand({ description, hint, run });
