import { Logger } from "winston";
import { createLogger as createModuleLogger, ModuleLogger } from "./module.logger";
import { createLogger as createRootLogger } from "./root.logger";

let rootLogger: Logger;

export { ModuleLogger } from "./module.logger";

export const createLogger = (module: NodeModule): ModuleLogger => {
  rootLogger ??= createRootLogger();

  return createModuleLogger(module, rootLogger);
};

export default {
  createLogger
};
