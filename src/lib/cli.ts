#!/usr/bin/env node
import chalk from "chalk";
import help from "./help";
import parser from "./commandParser";
import moduleLogger from "./logger";

/* eslint-disable no-useless-escape */
const header = `
###########################################################################
#                                                                         #
#                    _ \\   _ \\  |   |__ __| ____|  _ \\                    #
#                   |   | |   | |   |   |   __|   |   |                   #
#                   __ <  |   | |   |   |   |     __ <                    #
#                  _| \\_\\\\___/ \\___/   _|  _____|_| \\_\\                   #
#                                                                         #
#                            ___| |    _ _|                               #
#                           |     |      |                                #
#                           |     |      |                                #
#                          \\____|_____|___|                               #
#                                                                         #
#                   ASUS Router Command Line Interface                    #
#                https://github.com/jaspenlind/asuswrt-cli                #
###########################################################################`;
/* eslint-enable no-useless-escape */

const cli = {
  run: () => {
    const logger = moduleLogger.createLogger(module);

    const args = process.argv.slice(2);

    const commands = parser(...args);

    const command = commands.find();

    logger.debug(undefined, { meta: { args, command } });

    if (!commands.isDebug) {
      console.clear();
      console.log(header);
    }

    if (commands.isHelp || args.length < 1) {
      if (command) {
        help(command);
      } else {
        help();
      }
    } else if (command !== null && command.run) {
      command.run(command.args);
    } else {
      if (command) {
        help(command);
      } else {
        help();
      }
      console.error(chalk.red("\nUnknown command\n"));
    }
  }
};

export default cli;
