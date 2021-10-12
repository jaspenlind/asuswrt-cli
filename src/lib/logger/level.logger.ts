import winston from "winston";

const CATEGORY_ARG = "--log.category=";

const filterCategories = () =>
  process.argv.filter((x) => x.startsWith(CATEGORY_ARG)).map((x) => x.substring(CATEGORY_ARG.length));

const shouldLog = (category: string) => {
  const filter = filterCategories();
  return filter.length === 0 || filter.some((x) => category.startsWith(x)); // filter.find((x) => category.startsWith(x));
};

const createCategory = (loggerName: string, source?: string): string => {
  let category = loggerName;

  if (source) {
    category = `${category}::${source}`;
  }

  return category;
};

const log = (
  logger: winston.Logger,
  category: string,
  level: string,
  message: string,
  meta: Record<string, string>
) => {
  if (!shouldLog(category)) {
    return;
  }

  logger.log(level, message, {
    category,
    meta
  });
};
export interface LogMethod {
  (message: string, source?: string): void;
  (message: Record<string, unknown>, source: string): void;
}

export const createLogger = (moduleLogger: winston.Logger, level: string, name?: string) => {
  return (message: string | Record<string, unknown>, source?: string): void => {
    const record = message as Record<string, string>;
    const logMessage = typeof message === "string" ? (message as string) : name || "";
    const category = createCategory(name || "", source);

    log(moduleLogger, category, level, logMessage, record);
  };
};
