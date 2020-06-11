#!/usr/bin/env node
import chalk from "chalk";
import { parse, OptionMap } from "args-any";
import { any } from "./arrayHelper";
import declaration, { CommandDeclaration } from "../models/commandDeclaration";
import header from "../resources/header";
import help from "./help";
import commandParser from "./commandParser";
import config from "./ssh/config";

const hasDebug = (options: OptionMap) => options.has("debug");
const hasHelp = (options: OptionMap) => options.has("h") || options.has("help");

const isEmpty = (command: CommandDeclaration) => command === declaration.empty;

const isHelp = (command: CommandDeclaration, options: OptionMap) =>
  options.args.all().length === 0 || hasHelp(options) || isEmpty(command) || !command.canRun;

const showHelp = (command: CommandDeclaration, options: OptionMap) => {
  if (!isHelp(command, options) && !isEmpty(command)) return;

  help(command);

  if (isEmpty(command)) {
    console.error(chalk.red("\nUnknown command\n"));
  }
};

const runCommand = (command: CommandDeclaration, options: OptionMap) => {
  if (isHelp(command, options) || isEmpty(command)) return;

  config.check(command).then(ok => {
    if (!ok) return;

    const message = [`Excuting: router ${chalk.bold(command.fullName)}`];

    if (any(command.args)) {
      message.push(` with options '${command.args.join(" ")}'`);
    }

    message.push(" ...");
    console.log(message.join(""));
    command.command.run(...command.args);
  });
};

const cli = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  run: (...args: string[]) => {
    const parser = commandParser(...args);
    const options = parse(args);

    const currentCommand = parser.find();

    if (!hasDebug(options)) {
      console.clear();
      console.log(header());
    }

    showHelp(currentCommand, options);
    runCommand(currentCommand, options);
  }
};

export default cli;
