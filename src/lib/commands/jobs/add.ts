import chalk from "chalk";
import { prompt } from "promptly";

import { create } from "../../../models/command";
import { tryParseExpression } from "../../helpers/cron.helpers";
import { createSSH, withConsole } from "../../ssh";

const invalidExpression = chalk.red("invalid expression");

const cronExpressionValidator = (value: string) => {
  const { success } = tryParseExpression(value);

  if (!success) {
    throw new Error(invalidExpression);
  }

  return value;
};

const getCronExpression = async (value: string) => {
  const { success } = tryParseExpression(value);

  if (success) {
    return value;
  }

  if (value) {
    console.log(invalidExpression);
  }

  return prompt("Cron expression: ", { validator: cronExpressionValidator });
};

const description = "Creates a new cron job";

const hint = "<unique id> <cron expression> <command>";

const run = async (...args: string[]) => {
  let [id, cronExpression, commandToAdd] = args;
  id ||= await prompt("Unique id for the job to add: ");
  cronExpression = await getCronExpression(cronExpression);
  commandToAdd ||= await prompt("Command to execute: ");

  const ssh = createSSH();
  ssh.exec(`echo 'cru a ${id} "${cronExpression} ${commandToAdd}"'`, withConsole).start();
};

export default create({ description, hint, run });
