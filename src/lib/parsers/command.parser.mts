#!/usr/bin/env node
import argsAny from "args-any";
import { flexi, FlexiPath, Path, PathMeta, PathType, until } from "flexi-path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { create, empty } from "../../models/command-declaration.mjs";
import { CommandDeclaration, CommandParser } from "../../types/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootCommandPath = flexi.path(__dirname).parent().append("commands/");

export const isHelp = (...args: string[]): boolean => {
  return (args.length > 0 && args[0] === "-h") || false;
};

const isDebug = (...args: string[]): boolean => args.filter((x) => x === "--debug").length > 0;

const isCommandRoot = (path: FlexiPath) => {
  const pathString = path.path.endsWith("/") ? path.path : `${path.path}/`;

  return pathString === rootCommandPath.path;
};

// const getParentCommand = (path: FlexiPath) => {
//   const parent = path.parent();
//   const parentCommand =
//     parent.files().find((x) => x.name === path.name) || parent.files().find((x) => isIndex(x)) || flexi.empty();

//   return parentCommand;
// };

// const mostSpecificCommand = (path: FlexiPath): [FlexiPath, ...string[]] => {
//   const { segments } = path;
//   const options = argsAny.parse(segments);
//   const pathWithoutOptions = options.args.other();

//   const walked = flexi.walk.back(pathWithoutOptions, {
//     until: until.exists({ ignoreFileExtensions: true })
//   });

//   const args = walked.diff.prepend(...options.args.options()).segments;
//   let matchedCommand = walked.result;

//   if (walked.result.isEmpty() || isCommandRoot(walked.result)) {
//     return [flexi.empty(), ...args];
//   }

//   if (!matchedCommand.exists()) {
//     matchedCommand = getParentCommand(matchedCommand);
//   }

//   return [matchedCommand, ...args];
// };

const ensureIndex = (path: FlexiPath): FlexiPath =>
  path.type() === PathType.Directory ? path.append("index.mts") : path;

const withoutOptions = (args: string[]): string[] => args.filter((x) => !x.startsWith("-"));

const isIndex = (path: PathMeta) => path.name === "index";

const fullName = (path: FlexiPath) =>
  path
    .except(rootCommandPath)
    .parent((x) => !isIndex(x))
    .flatten()
    .map((x) => x.name)
    .join(" ");

// const subCommands = async (path: FlexiPath ) => await Promise.all(path
//   .children()
//   .filter((x) => !x.isEmpty() && !isIndex(x))
//   .map(async (x) => createCommand(x)));

// const createCommand = async (path: FlexiPath): Promise<CommandDeclaration> => {
//   const [commandPath, ...args] = mostSpecificCommand(path);
//   const currentCommand = await requireContent(commandPath);

//   const trimmedPath = commandPath
//     .except(rootCommandPath)
//     .parent((x) => !isIndex(x));

//   const { name } = trimmedPath;

//   return create({
//     args,
//     canRun: currentCommand.default?.run !== empty.run,
//     fullName : fullName(trimmedPath),
//     name,
//     subCommands: await subCommands(commandPath),
//     command: currentCommand.default
//   });
// }

// const allCommands = (): Promise<CommandDeclaration[]> => Promise.all(
//   rootCommandPath
//     .children()
//     .map((x:any) => createCommand(x))
//     .filter((x:any) => x !== empty)
// );

// const parseCommand = (path: Path): Promise<CommandDeclaration> => flexi.isEmpty(path)
//   ? Promise.resolve(empty)
//   : createCommand(flexi.path(rootCommandPath).append(path));

// export const parse = async (...args: string[]): Promise<CommandParser> => {
//   const cleanArgs = withoutOptions(...args);

//   //const commands = await allCommands();
//   //const find = await parseCommand(args);
//   const find = await requireContent(flexi.path(rootCommandPath).append(args));
//   return {
//     all: () => [], //commands,
//     find: () => find,
//     isHelp: isHelp(...args),
//     isDebug: isDebug(...args),
//     stripOptions: () => cleanArgs
//   };
// };
const extensions = ["mts", "mjs", "ts", "js"];
const withExtension = (path: FlexiPath): FlexiPath =>
  path.exists() ? path : extensions.map((x) => flexi.path(`${path.path}.${x}`)).find((x) => x.exists()) || path;

export const all = async (...args: string[]): Promise<CommandDeclaration[]> => {
  const commands = await Promise.all(rootCommandPath.children().map((x) => createCommand(x, args)));

  return commands.filter((x) => x !== empty);
};

const subCommands = (path: FlexiPath, args: string[]) =>
  Promise.all(
    path
      .children()
      .filter((x) => !x.isEmpty() && !isIndex(x))
      .map((x) => createCommand(x, args))
  );

const createCommand = async (path: FlexiPath, args: string[]): Promise<CommandDeclaration> => {
  const file = ensureIndex(withExtension(path));

  if (isCommandRoot(file) || !file.exists()) {
    return empty;
  }

  const { name } = path;
  const command = await import(`${file.path}`);

  return create({
    args: withoutOptions(args),
    command: command.default,
    subCommands: subCommands(path, args),
    canRun: command.default?.run !== empty.run,
    name,
    fullName: fullName(path)
  });
};

export const parse = (...args: string[]): Promise<CommandDeclaration> => {
  const path = flexi.path(rootCommandPath).append(args);
  return createCommand(path, args);
};
