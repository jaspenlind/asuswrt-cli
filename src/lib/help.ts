#!/usr/bin/env node
import chalk from "chalk";
import { any } from "./arrayHelper";
import declaration from "../types/CommandDeclaration";
import moduleLogger from "./logger";
import parser from "./commandParser";

import { CommandDeclaration } from "../types";

const logger = moduleLogger.createLogger(module);

const toColumns = (strings: string[], width = 40): string => {
  const all = [...(strings || [])];
  const left = all.slice(0, -1).map(x => x.padEnd(width, " "));
  const right = all.slice(all.length - 1);

  return left.concat(right).join(" ");
};

const help = (command?: CommandDeclaration): void => {
  const isRootHelp = command === undefined || command === declaration.empty;
  const guardCheckedCommand = command as CommandDeclaration;
  const commandName = isRootHelp
    ? ""
    : chalk.bold(` ${guardCheckedCommand.fullName}`);
  logger.debug(undefined, {
    functionName: "help",
    meta: { isRootHelp, commandName }
  });

  const usage =
    (!isRootHelp && guardCheckedCommand.command.hint) || "options [parameters]";
  const lines = [`Usage: router${commandName} ${usage}`];

  const commands = isRootHelp
    ? parser().all()
    : guardCheckedCommand.subCommands || [command];

  commands.forEach(x =>
    lines.push(
      toColumns([
        ` ${x.command.helpName || x.name}`,
        x.command.description || ""
      ])
    )
  );

  if (isRootHelp || (command !== undefined && any(command.subCommands))) {
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
