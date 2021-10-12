import chalk from "chalk";
import cli from "../lib/cli";
import logger from "../lib/logger";

const routerLogger = logger.createLogger(module);

process.once("uncaughtException", (err) => {
  routerLogger.error(err.stack);

  console.error(err.message);

  process.exitCode = 2;
});

process.once("unhandledRejection", (reason) => {
  const err = reason as Error;
  const message = err?.message || "unhandled rejection";
  const stack = err?.stack || message;

  const cancelled = message === "canceled";

  if (cancelled) {
    routerLogger.info("cancelled");
    console.log(chalk.red("cancelled"));
  } else {
    routerLogger.error(stack);
    console.log(chalk.red(message));
  }
});

cli.run(...process.argv.slice(2));
