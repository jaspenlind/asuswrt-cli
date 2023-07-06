import winston, { addColors, format, Logger, transports } from "winston";

const DEBUG_ARG = "--debug";
const levelMinWidth = 9;
const categoryMinWidth = 40;

const createMeta = (meta: Record<string, string>): string => {
  if (!meta) {
    return "";
  }

  if (Object.keys(meta).length > 0) {
    return `\n${JSON.stringify(meta, (_, value) => value || null, 2)}`;
  }

  return `=${meta}`;
};

export const createLogger = (): Logger => {
  const isDebug = process.argv.filter((x) => x === DEBUG_ARG).length > 0;
  const { align, combine, printf } = format;

  addColors({
    debug: "white",
    error: "red",
    fatal: "red",
    info: "green",
    verbose: "grey",
    warn: "yellow"
  });

  return winston.createLogger({
    format: combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      align(),
      printf((info) => {
        const { category, message, meta, level, timestamp } = info;
        const logLevel = `[${level}]`.padEnd(levelMinWidth);
        const logCategory = `[${category}]`.padEnd(categoryMinWidth);
        const logMeta = createMeta(meta);

        return `${timestamp} ${logLevel} ${logCategory} ${message}${logMeta}`;
      })
    ),
    level: isDebug ? "debug" : "info",
    transports: [new transports.File({ filename: "combined.log", handleExceptions: true })]
  });
};

export default createLogger;
