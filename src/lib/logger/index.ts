import { Logger } from "winston";
import { createLogger as createRootLogger } from "./root.logger";
import { createLogger as createModuleLogger, ModuleLogger } from "./module.logger";

let root: Logger;

export { ModuleLogger } from "./module.logger";

export const createLogger = (module: NodeModule): ModuleLogger => {
  root ??= createRootLogger();

  return createModuleLogger(module, root);
};

export default {
  createLogger
};
