#!/usr/bin/env node
import chalk from "chalk";
import { command } from "./parsers/index.mjs";
import { empty } from "../models/command-declaration.mjs";
import { CommandDeclaration } from "../types/index.mjs";

// const logger = moduleLogger.createLogger(module);
const isRoot = (declaration?: CommandDeclaration) => typeof declaration === "undefined" || declaration === empty;

const fullName = (declaration?: CommandDeclaration) => (isRoot(declaration) ? "" : declaration?.fullName);
const name = (declaration?: CommandDeclaration) => declaration?.command?.helpName || declaration?.name || "";

const toColumns = (strings: string[], width = 40): string => {
  const all = [...(strings || [])];
  const left = all.slice(0, -1).map((x) => x.padEnd(width, " "));
  const right = all.slice(all.length - 1);

  return left.concat(right).join(" ");
};
const getCommands = async (declaration?: CommandDeclaration) => {
  if (isRoot(declaration)) {
    return await command.all();
    // const parse = await command.parse();
    // return parse.all();
  }

  if (!command) {
    return [];
  }

  return declaration?.subCommands || [command];
};

const usage = async (declaration?: CommandDeclaration) => {
  const commandName = chalk.bold(`${fullName(declaration)}`);
  const hint = (isRoot(declaration) && declaration?.command?.hint) || "options [parameters]";

  const title = `Usage: router ${commandName} ${hint}`;
  const commands = await getCommands(declaration);
  const result = commands.map((x:any) => toColumns([name(x), x?.command?.description || ""]));
  return [title, ...result];
};

const options = async (declaration?: CommandDeclaration) => {
  const commands = await getCommands(declaration);
  const result = commands.map((x:any) => toColumns([` -h ${x.fullName}`, `${x.name} options`]));

  const title = `
Help options:

${toColumns([" -h", "Show this help screen about the tool"])}`;

  return isRoot(declaration) || commands.length > 0 ? [title, ...result] : [];
};

export const help = async (declaration?: CommandDeclaration): Promise<void> => {
  const lines = [...await usage(declaration), ...await options(declaration)];
  console.log(lines.join("\n"));
};

export default help;
