#!/usr/bin/env node
import chalk from "chalk";
import header from "../resources/header";
import help from "./help";
import commandParser, { empty as emptyCommand } from "./commandParser";
import moduleLogger from "./logger";
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
      parser.isHelp || args.length === empty || currentCommand === emptyCommand;

    const invalidCommand =
      parser.stripOptions().length > empty &&
      (currentCommand === emptyCommand || currentCommand.run === undefined);

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
          if (ok) {
            currentCommand.run(...currentCommand.args);
          }
        })
        .catch((err: Error) => console.log(chalk.red(err.message)));
    }
  }
};

export default cli;
