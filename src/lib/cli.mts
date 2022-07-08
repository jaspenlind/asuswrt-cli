#!/usr/bin/env node
import argsAny, { OptionMap } from "args-any";
import chalk from "chalk";
import help from "./help.mjs";
import { any } from "./helpers/array.helpers.mjs";
import { command } from "./parsers/index.mjs";
import { check } from "./ssh/config/index.mjs";
import { empty } from "../models/command-declaration.mjs";
import { header } from "../resources/header.mjs";
import { CommandDeclaration } from "../types/index.mjs";

const hasDebug = (options: OptionMap) => options.has("debug");
const hasHelp = (options: OptionMap) => options.has("h") || options.has("help");
const isEmpty = (declaration: CommandDeclaration) => declaration === empty;
const isHelp = (declaration: CommandDeclaration, options: OptionMap) =>
  options.args.all().length === 0 || hasHelp(options) || isEmpty(declaration) || !declaration.canRun;

const showHelp = async (declaration: CommandDeclaration, options: OptionMap) => {
  if (!isHelp(declaration, options) && !isEmpty(declaration)) return;

  await help(declaration);

  if (isEmpty(declaration)) {
    console.error(chalk.red("\nUnknown command\n"));
  }
};

const runCommand = async (declaration: CommandDeclaration, options: OptionMap) => {
  if (isHelp(declaration, options) || isEmpty(declaration)) return;

  const checked = await check(declaration);

  if (checked) {
    const message = [`Excuting: router ${chalk.bold(declaration.fullName)}`];

    if (any(declaration.args)) {
      message.push(` with options '${declaration.args.join(" ")}'`);
    }

    message.push(" ...");
    console.log(message.join(""));
    declaration.command.run(...declaration.args);
  }
};

export const run = async (...args: string[]) => {
  const options = argsAny.parse(args);
  const currentCommand = await command.parse(...args);

  // if (!hasDebug(options)) {
  //   console.clear();
  //   console.log(await header());
  // }

  await showHelp(currentCommand, options);
  runCommand(currentCommand, options);
};

// const cli = {
//   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
//   run: (...args: string[]) => {
//     const parser = commandParser(...args);
//     const options = parse(args);

//     const currentCommand = parser.find();

//     if (!hasDebug(options)) {
//       console.clear();
//       console.log(header());
//     }

//     showHelp(currentCommand, options);
//     runCommand(currentCommand, options);
//   }
// };

// export default cli;

// export const run = async () => {
//   console.log(await header());
// };
