#!/usr/bin/env node
import chalk from "chalk";
import moduleLogger from "./logger";
import parser, { empty } from "./commandParser";

import { Command } from "../types";

const logger = moduleLogger.createLogger(module);

const toColumns = (strings: string[], width = 40): string => {
  const all = [...(strings || [])];
  const left = all.slice(0, -1).map(x => x.padEnd(width, " "));
  const right = all.slice(all.length - 1);

  return left.concat(right).join(" ");
};

const help = (command?: Command): void => {
  const isRootHelp = command === undefined || command === empty;
  const guardCheckedCommand = command as Command;
  const commandName = isRootHelp
    ? ""
    : chalk.bold(` ${guardCheckedCommand.fullName}`);
  logger.debug(undefined, {
    functionName: "help",
    meta: { isRootHelp, commandName }
  });

  const usage =
    (!isRootHelp && guardCheckedCommand.usage) || "options [parameters]";
  const lines = [`Usage: router${commandName} ${usage}`];

  const commands = isRootHelp
    ? parser().all()
    : guardCheckedCommand.subCommands || [command];

  commands.forEach(x =>
    lines.push(toColumns([` ${x.helpName || x.name}`, x.description]))
  );

  if (isRootHelp || commands.filter(x => x.subCommands.length > 0)) {
    lines.push("");
    lines.push("Help options:");

    lines.push(toColumns([" -h", "Show this help screen about the tool"]));

    commands.forEach(x =>
      lines.push(toColumns([` -h ${x.fullName}`, `${x.name} options`]))
    );
  }
  console.log(lines.join("\n"));
};

export default help;
