#!/usr/bin/env node
import { table } from "table";
import { get } from "../../../config/nvram";
import { merlinCommand } from "../../../../../models/command";

const description = "NAT rules";

const header = ["name", "ext. port", "int. port", "int. ip", "protocol", "src ip"];

const run = () => {
  const rules = get("vts_rulelist")
    .split("<")
    .map(x => x.split(">"))
    .filter(x => x.length > 1);

  if (rules.length === 0) {
    console.log("No nat rules has been configured");
    return;
  }

  rules.unshift(header);
  const tabularRules = table(rules, {
    columnDefault: {
      width: 12
    },
    columns: {
      2: {
        width: 15
      }
    }
  });
  console.log(tabularRules);
};

export default merlinCommand({ description, run });
