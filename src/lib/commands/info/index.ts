#!/usr/bin/env node
import { Command } from "../../../types";
import helper from "../../commandHelper";

const info: Command = helper.create({
  description: "Shows router information"
});

export default info;
