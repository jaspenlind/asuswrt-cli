import { createLogger, format, transports, addColors } from "winston";
import extensionless from "extensionless";
import pathless from "./pathless";

const { combine, align, printf, colorize } = format;

const DEBUG_ARG = "--debug";
const CATEGORY_ARG = "--log.category=";

const isDebug = process.argv.filter(x => x === DEBUG_ARG).length > 0;
const filterCategories = process.argv
  .filter(x => x.startsWith(CATEGORY_ARG))
  .map(x => x.substring(CATEGORY_ARG.length));

const createCategory = (loggerName: string, functionName = ""): string => {
  let category = loggerName;

  if (functionName) {
    category = `${category}::${functionName}`;
  }

  return category;
};

const createMeta = (meta: any): string => {
  if (meta && Object.keys(meta).length && Object.keys(meta).length > 0) {
    return `\n${JSON.stringify(meta, (key, value) => value || null, 2)}`;
  }

  return (meta && `=${meta}`) || "";
};

const rootLogger = createLogger({
  level: isDebug ? "debug" : "info",
  format: combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    align(),
    printf(info => {
      const { timestamp, level, message, category, meta } = info;
      const logLevel = `[${level}]`.padEnd(9);
      const logCategory = `[${category}]`.padEnd(40);
      const logMeta = createMeta(meta);

      return `${timestamp} ${logLevel} ${logCategory} ${message}${logMeta}`;
    }),
    colorize({ all: true })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log", handleExceptions: true })
  ]
});

addColors({
  verbose: "grey",
  debug: "white",
  info: "green",
  warn: "yellow",
  error: "red",
  fatal: "red"
});

export interface Logger {
  name: string;
  verbose: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
}

export interface LogMethod {
  (
    message?: string,
    options?: {
      functionName?: string;
      meta?: any;
    }
  ): void;
}

const createModuleLogger = (module: NodeModule): Logger => {
  const moduleName = extensionless(pathless(module.filename));
  const moduleLogger = rootLogger.child({
    moduleName
  });

  const log = (
    name: string | null,
    level: string,
    message: string,
    options: {
      functionName?: string;
      meta?: any;
    } = {}
  ): void => {
    const category = createCategory(name || "", options.functionName);

    const categoryShouldBeLogged =
      filterCategories.length === 0 ||
      filterCategories.find(x => category.startsWith(x));

    if (!categoryShouldBeLogged || (!message && !options.meta)) {
      // Nothing to log
      return;
    }
    moduleLogger.log(level, message || "", {
      category,
      meta:
        options.meta && typeof options.meta === "function"
          ? options.meta()
          : options.meta
    });
  };

  const logger = {
    name: moduleName,
    verbose: (message?: string, options?: any) =>
      log(null, "verbose", message || "", options),
    debug: (message?: string, options?: any) =>
      log(moduleName, "debug", message || "", options),
    info: (message?: string, options?: any) =>
      log(moduleName, "info", message || "", options),
    warn: (message?: string, options?: any) =>
      log(moduleName, "warn", message || "", options),
    error: (message?: string, options?: any) =>
      log(moduleName, "error", message || "", options),
    fatal: (message?: string, options?: any) =>
      log(moduleName, "fatal", message || "", options)
  };

  logger.info(`Logger for module ${moduleName} created`, {
    functionName: createModuleLogger.name
  });

  return logger;
};

export default {
  createLogger: createModuleLogger
};
