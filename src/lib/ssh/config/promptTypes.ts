import { PromptBody, PromptType } from "../../../types";

import promptly = require("promptly");

const promptTypes = new Map<PromptType, PromptBody>([
  [PromptType.Text, promptly.prompt],
  [PromptType.Password, promptly.password],
  [PromptType.Confirm, promptly.confirm]
]);

export default promptTypes;
