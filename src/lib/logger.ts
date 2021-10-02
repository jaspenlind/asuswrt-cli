import winston, { createLogger, format, transports, addColors } from "winston";

import flexi from "flexi-path";

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

const createMeta = (meta: Record<string, string>): string => {
  if (meta && Object.keys(meta).length && Object.keys(meta).length > 0) {
    return `\n${JSON.stringify(meta, (key, value) => value || null, 2)}`;
  }

  return (meta && `=${meta}`) || "";
};

const levelMinWidth = 9;
const categoryMinWidth = 40;

const rootLogger = createLogger({
  format: combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    align(),
    printf(info => {
      const { timestamp, level, message, category, meta } = info;
      const logLevel = `[${level}]`.padEnd(levelMinWidth);
      const logCategory = `[${category}]`.padEnd(categoryMinWidth);
      const logMeta = createMeta(meta);

      return `${timestamp} ${logLevel} ${logCategory} ${message}${logMeta}`;
    }),
    colorize({ all: true })
  ),
  level: isDebug ? "debug" : "info",
  transports: [
    // new transports.Console(),
    new transports.File({ filename: "combined.log", handleExceptions: true })
  ]
});

addColors({
  debug: "white",
  error: "red",
  fatal: "red",
  info: "green",
  verbose: "grey",
  warn: "yellow"
});
export interface LogMethod {
  (message: string, source?: string): void;
  (message: Record<string, unknown>, source: string): void;
}
export interface ModuleLogger {
  name: string;
  verbose: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
}

const createLoggerInstance = (moduleLogger: winston.Logger, level: string, name?: string) => {
  return (message: string | Record<string, unknown>, source?: string): void => {
    const record = message as Record<string, string>;
    const recordValues = (record && Object.values(record)) || [];
    const logMessage = recordValues.length > 0 ? recordValues[0] : (message as string);
    const category = createCategory(name || "", source);

    const categoryShouldBeLogged = filterCategories.length === 0 || filterCategories.find(x => category.startsWith(x));

    if (!categoryShouldBeLogged) {
      return;
    }

    moduleLogger.log(level, logMessage, {
      category,
      meta: record
    });
  };
};

const createModuleLogger = (module: NodeModule): ModuleLogger => {
  const moduleName = flexi.path(module.filename).name;
  const moduleLogger = rootLogger.child({
    moduleName
  });

  return {
    name: moduleName,
    verbose: createLoggerInstance(moduleLogger, "verbose"),
    debug: createLoggerInstance(moduleLogger, "debug", moduleName),
    info: createLoggerInstance(moduleLogger, "info", moduleName),
    warn: createLoggerInstance(moduleLogger, "warn", moduleName),
    error: createLoggerInstance(moduleLogger, "error", moduleName),
    fatal: createLoggerInstance(moduleLogger, "fatal", moduleName)
  };
};

export default {
  createLogger: createModuleLogger
};
