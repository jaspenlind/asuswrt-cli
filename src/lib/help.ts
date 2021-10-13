#!/usr/bin/env node
import chalk from "chalk";
import parser from "./parsers/command.parser";
import { CommandDeclaration, empty } from "../models/command-declaration";

// const logger = moduleLogger.createLogger(module);
const isRoot = (command?: CommandDeclaration) => typeof command === "undefined" || command === empty;

const fullName = (command?: CommandDeclaration) => (isRoot(command) ? "" : command?.fullName);
const name = (command?: CommandDeclaration) => command?.command?.helpName || command?.name || "";

const toColumns = (strings: string[], width = 40): string => {
  const all = [...(strings || [])];
  const left = all.slice(0, -1).map((x) => x.padEnd(width, " "));
  const right = all.slice(all.length - 1);

  return left.concat(right).join(" ");
};
const getCommands = (command?: CommandDeclaration) => {
  if (isRoot(command)) {
    return parser().all();
  }

  if (!command) {
    return [];
  }

  return command?.subCommands || [command];
};

const usage = (command?: CommandDeclaration) => {
  const commandName = chalk.bold(`${fullName(command)}`);
  const hint = (isRoot(command) && command?.command?.hint) || "options [parameters]";

  const title = `Usage: router ${commandName} ${hint}`;
  const commands = getCommands(command).map((x) => toColumns([name(x), x?.command?.description || ""]));

  return [title, ...commands];
};

const options = (command?: CommandDeclaration) => {
  const title = `
Help options:

${toColumns([" -h", "Show this help screen about the tool"])}`;

  const commands = getCommands(command).map((x) => toColumns([` -h ${x.fullName}`, `${x.name} options`]));

  return isRoot(command) || commands.length > 0 ? [title, ...commands] : [];
};

export const help = (command?: CommandDeclaration): void => {
  const lines = [...usage(command), ...options(command)];
  console.log(lines.join("\n"));
};

export default help;
