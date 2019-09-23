import cli from "../lib/cli";

process.once("uncaughtException", err => {
  console.error(err.stack);

  process.exitCode = 2;
});

cli.run(...process.argv.slice(2));
