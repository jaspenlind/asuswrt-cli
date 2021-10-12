import flexi from "flexi-path";
import { Logger } from "winston";
import { createLogger as create, LogMethod } from "./level.logger";

export interface ModuleLogger {
  name: string;
  verbose: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
}

export const createLogger = (module: NodeModule, rootLogger: Logger): ModuleLogger => {
  const moduleName = flexi.path(module.filename).name;
  const moduleLogger = rootLogger.child({
    moduleName
  });

  return {
    name: moduleName,
    verbose: create(moduleLogger, "verbose"),
    debug: create(moduleLogger, "debug", moduleName),
    info: create(moduleLogger, "info", moduleName),
    warn: create(moduleLogger, "warn", moduleName),
    error: create(moduleLogger, "error", moduleName),
    fatal: create(moduleLogger, "fatal", moduleName)
  };
};
