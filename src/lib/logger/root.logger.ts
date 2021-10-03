import winston, { format, transports, Logger, addColors } from "winston";

const DEBUG_ARG = "--debug";
const levelMinWidth = 9;
const categoryMinWidth = 40;

const createMeta = (meta: Record<string, string>): string => {
  if (meta && Object.keys(meta).length && Object.keys(meta).length > 0) {
    return `\n${JSON.stringify(meta, (key, value) => value || null, 2)}`;
  }

  return (meta && `=${meta}`) || "";
};

export const createLogger = (): Logger => {
  const isDebug = process.argv.filter(x => x === DEBUG_ARG).length > 0;
  const { combine, align, printf } = format;

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
      printf(info => {
        const { timestamp, level, message, category, meta } = info;
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
