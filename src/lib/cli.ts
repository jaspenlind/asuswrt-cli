#!/usr/bin/env node
import chalk from "chalk";
import header from "../resources/header";
import help from "./help";
import commandParser from "./commandParser";
import moduleLogger from "./logger";
import { Command } from "../types";
import createConfig from "./ssh/createConfig";

const cli = {
  run: () => {
    const logger = moduleLogger.createLogger(module);

    const args = process.argv.slice(2);

    const parser = commandParser(...args);

    if (!parser.isDebug) {
      console.clear();
      console.log(header());
    }

    // console.log(createConfig());

    const currentCommand = parser.find();

    const showHelp =
      parser.isHelp || args.length === 0 || currentCommand === null;

    const invalidCommand =
      parser.stripOptions().length > 0 &&
      (currentCommand === null || currentCommand.run === undefined);

    logger.debug(undefined, { meta: { args, currentCommand } });

    if (showHelp || invalidCommand) {
      help(currentCommand);

      if (invalidCommand) {
        console.error(chalk.red("\nUnknown command\n"));
      }
    } else {
      (currentCommand as Command).run();
    }
  }
};

export default cli;
