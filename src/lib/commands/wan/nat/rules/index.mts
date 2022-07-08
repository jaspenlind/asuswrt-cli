#!/usr/bin/env node
import { table } from "table";
import { merlinCommand } from "../../../../../models/command.mjs";
import { get } from "../../../config/nvram/index.mjs";

const description = "NAT rules";

const header = ["name", "ext. port", "int. port", "int. ip", "protocol", "src ip"];

const run = () => {
  const rules = get("vts_rulelist")
    .split("<")
    .map((x:any) => x.split(">"))
    .filter((x:any) => x.length > 1);

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
