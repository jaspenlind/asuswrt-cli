#!/usr/bin/env node
import { join } from "path";
import { existsSync, lstatSync, readdirSync } from "fs";
import extensionless from "extensionless";
import Command from "../models/Command";
import CommandParser from "../models/CommandParser";
import moduleLogger from "./logger";

const ROOT_COMMAND_FOLDER = "../commands";

const logger = moduleLogger.createLogger(module);

const scriptExtension = () => {
  const scriptName = process.argv[1];

  return scriptName.substring(scriptName.length - 2);
};
const index = (): string => `index.${scriptExtension()}`;

const isHelp = (...args: string[]): boolean => {
  return (args.length > 0 && args[0] === "-h") || false;
};

const isDebug = (...args: string[]): boolean =>
  args.filter(x => x === "--debug").length > 0;

const checkExists = (commandPath: string): boolean => {
  const pathExists = existsSync(commandPath);
  const pathWithExtExists = existsSync(`${commandPath}.${scriptExtension()}`);

  logger.debug(undefined, {
    functionName: checkExists.name,
    meta: { commandPath, pathExists, pathWithExtExists }
  });

  return pathExists || pathWithExtExists;
};

const buildCommandPath = (...args: string[]): string => {
  const commandPath = join(
    __dirname,
    [ROOT_COMMAND_FOLDER].concat(args).join("/")
  );

  logger.debug(undefined, {
    functionName: buildCommandPath.name,
    meta: { args, commandPath }
  });

  return commandPath;
};

const getMostSpecificCommand = (...args: string[]): string[] => {
  const commandPath = buildCommandPath(...args);

  const exists = checkExists(commandPath)
    ? args
    : getMostSpecificCommand(...args.slice(0, -1));

  logger.debug(undefined, {
    functionName: getMostSpecificCommand.name,
    meta: { args, commandPath, exists }
  });

  return exists;
};

const getCommandArgs = (...args: string[]): string[] => {
  const commandArgs = getMostSpecificCommand(...args);

  return args.length > commandArgs.length ? args.slice(commandArgs.length) : [];
};

const getCommandName = (...args: string[]): string => {
  const hit = getMostSpecificCommand(...args);
  const commandPath = buildCommandPath(...hit);
  const parts = commandPath.split("/");

  return extensionless(parts[parts.length - 1]);
};

const getCommandFullName = (...args: string[]): string => {
  return extensionless((getMostSpecificCommand(...args) || []).join(" "));
};

const createCommand = (
  commandPath: string,
  args: string[],
  subCommands: Command[]
): Command | null => {
  if (!commandPath || !lstatSync(commandPath).isFile()) {
    return null;
  }

  // eslint-disable-next-line import/no-dynamic-require,global-require,@typescript-eslint/no-var-requires
  const content = require(commandPath).default;

  return {
    name: getCommandName(...args),
    fullname: getCommandFullName(...args),
    run: content.run,
    helpname: content.helpname,
    description: content.description,
    subCommands
  };
};

const command = (...args: string[]): Command | null => {
  const deepestCommand = getMostSpecificCommand(...args);
  const commandPath = buildCommandPath(...deepestCommand);
  const commandPathExists = checkExists(commandPath);
  const isDirectory =
    existsSync(commandPath) && lstatSync(commandPath).isDirectory();

  logger.debug(undefined, {
    functionName: command.name,
    meta: { deepestCommand, commandPath, commandPathExists, isDirectory }
  });

  if (commandPathExists === false) {
    return null;
  }

  let commandDefinition;
  const subCommands: Command[] = [];

  if (isDirectory === false) {
    const extension = scriptExtension();
    commandDefinition = commandPath;
    if (commandDefinition && !commandDefinition.endsWith(extension)) {
      commandDefinition = `${commandDefinition}.${extension}`;
    }
  } else if (isDirectory && checkExists(`${commandPath}/${index()}`)) {
    commandDefinition = `${commandPath}/${index()}`;
    readdirSync(commandPath)
      .filter(x => {
        const stat = lstatSync(`${commandPath}/${x}`);

        return stat.isFile() && x !== index() && !x.endsWith(".map");
      })
      .forEach(x => {
        const temp = command(...args.concat([extensionless(x)]));
        if (temp !== null) {
          subCommands.push(temp);
        }
      });
  }

  let result: Command | null = null;

  if (commandDefinition !== undefined) {
    if (checkExists(commandDefinition)) {
      result = createCommand(commandDefinition, args, subCommands);
    }
  }
  logger.debug(undefined, {
    functionName: command.name,
    meta: { commandDefinition, subCommands, result }
  });

  return result;
};

const getAvailableCommands = (): Command[] => {
  const commandPath = buildCommandPath();

  const commands: Command[] = [];

  readdirSync(commandPath)
    .filter(x => !/.*\.map$/.test(x))
    .forEach(x => {
      const temp = command(x);
      if (temp !== null) {
        commands.push(temp);
      }
    });

  logger.debug(undefined, {
    functionName: getAvailableCommands.name,
    meta: { commandPath, commands }
  });

  return commands;
};

const withoutOptions = (...args: string[]): string[] =>
  args.filter(x => !x.startsWith("-"));

const parse = (...args: string[]): Command | null => {
  const result = command(...args);

  if (result) {
    result.args = getCommandArgs(...args);
  }

  logger.debug(undefined, { functionName: parse.name, meta: { args, result } });

  return result;
};

const commandParser = (...args: string[]): CommandParser => {
  const commandArgs = [...(args || [])];
  const cleanArgs = withoutOptions(...args); // commandArgs.filter(x => !x.startsWith("-"));

  return {
    all: () => getAvailableCommands(),
    find: () => parse(...cleanArgs),
    isHelp: isHelp(...commandArgs),
    isDebug: isDebug(...commandArgs)
  };
};

export default commandParser;
