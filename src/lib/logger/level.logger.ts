import winston from "winston";

const CATEGORY_ARG = "--log.category=";

const filterCategories = () =>
  process.argv.filter((x) => x.startsWith(CATEGORY_ARG)).map((x) => x.substring(CATEGORY_ARG.length));

const createCategory = (loggerName: string, source?: string): string => {
  let category = loggerName;

  if (source) {
    category = `${category}::${source}`;
  }

  return category;
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

    const filter = filterCategories();
    const categoryShouldBeLogged = filter.length === 0 || filter.find((x) => category.startsWith(x));

    if (!categoryShouldBeLogged) {
      return;
    }

    moduleLogger.log(level, logMessage, {
      category,
      meta: record
    });
  };
};
