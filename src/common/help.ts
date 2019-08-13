#!/usr/bin/env node
import chalk from "chalk";
import moduleLogger from "./logger";
import parser from "./commandParser";
import Command from "../models/Command";

const logger = moduleLogger.createLogger(module);

const toColumns = (strings: string[], width = 40): string => {
  const all = [...(strings || [])];
  const left = all.slice(0, -1).map(x => x.padEnd(width, " "));
  const right = all.slice(all.length - 1);

  return left.concat(right).join(" ");
};

const help = (command: Command): void => {
  const isRootHelp = !command;
  const commandName = isRootHelp ? "" : chalk.bold(` ${command.fullname}`);
  logger.debug(undefined, {
    functionName: "help",
    meta: { isRootHelp, commandName }
  });
  const lines = [`Usage: router${commandName} options [parameters]`];

  const commands = isRootHelp
    ? parser().all()
    : command.subCommands || [command];

  commands.forEach(x =>
    lines.push(toColumns([` ${x.helpname || x.name}`, x.description]))
  );

  if (
    isRootHelp ||
    commands.filter(x => x.subCommands && x.subCommands.length > 0)
  ) {
    lines.push("");
    lines.push("Help options:");
    lines.push(toColumns([" -h", "Show this help screen about the tool"]));

    commands.forEach(x =>
      lines.push(toColumns([` -h ${x.name}`, `${x.name} options`]))
    );
  }
  console.log(lines.join("\n"));
};

export default help;
