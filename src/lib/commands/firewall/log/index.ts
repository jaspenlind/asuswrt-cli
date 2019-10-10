#!/usr/bin/env node
import { create } from "../../../../models/command";

const description = "Copy or analyze firewall log";

export default create({ description });
