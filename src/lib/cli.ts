#!/usr/bin/env node
import chalk from "chalk";
import header from "../resources/header";
import help from "./help";
import commandParser from "./commandParser";
import moduleLogger from "./logger";
import { Command } from "../types";
import config from "./ssh/config";

const empty = 0;

const cli = {
  run: (...args: string[]) => {
    const logger = moduleLogger.createLogger(module);

    const parser = commandParser(...args);

    if (!parser.isDebug) {
      console.clear();
      console.log(header());
    }

    const currentCommand = parser.find();

    const showHelp =
      parser.isHelp || args.length === empty || currentCommand === null;

    const invalidCommand =
      parser.stripOptions().length > empty &&
      (currentCommand === null || currentCommand.run === undefined);

    logger.debug(undefined, { meta: { args, currentCommand } });

    if (showHelp || invalidCommand) {
      help(currentCommand);

      if (invalidCommand) {
        console.error(chalk.red("\nUnknown command\n"));
      }
    } else {
      config
        .check()
        .then(ok => {
          if (ok && currentCommand !== null) {
            currentCommand.run(currentCommand.args);
          }
        })
        .catch((err: Error) => console.log(chalk.red(err.message)));
    }
  }
};

export default cli;
