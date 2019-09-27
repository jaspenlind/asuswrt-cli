#!/usr/bin/env node
import chalk from "chalk";
import { any } from "./arrayHelper";
import declaration from "../types/CommandDeclaration";
import header from "../resources/header";
import help from "./help";
import commandParser from "./commandParser";
import moduleLogger from "./logger";
import config from "./ssh/config";

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
      parser.isHelp ||
      !any(args) ||
      currentCommand === declaration.empty ||
      !currentCommand.canRun;

    const invalidCommand =
      parser.isHelp === false &&
      any(parser.stripOptions()) &&
      currentCommand === declaration.empty;

    logger.debug(undefined, { meta: { args, currentCommand } });

    if (showHelp || invalidCommand) {
      help(currentCommand);

      if (invalidCommand) {
        console.error(chalk.red("\nUnknown command\n"));
      }
    } else {
      config.check().then(ok => {
        if (ok) {
          console.log(
            `Excuting: router ${chalk.bold(currentCommand.fullName)} ${
              currentCommand.args
            } ...`
          );
          currentCommand.command.run(...currentCommand.args);
        }
      });
    }
  }
};

export default cli;
