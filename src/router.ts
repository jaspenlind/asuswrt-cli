#!/usr/bin/env node
import chalk from "chalk";
import help from "./common/help";
import parser from "./common/commandParser";
import moduleLogger from "./common/logger";

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

const logger = moduleLogger.createLogger(module);

const args = process.argv.slice(2);

const commands = parser(args);

const command = commands.find(args);

logger.debug(undefined, { meta: { args, command } });

// if (!commands.isDebug) {
//   console.clear();
//   console.log(header);
// }

if (commands.isHelp || args.length < 1) {
  help(command);
} else if (command && command.run) {
  command.run(command.args);
} else {
  help(command);
  console.error(chalk.red("\nUnknown command\n"));
}
