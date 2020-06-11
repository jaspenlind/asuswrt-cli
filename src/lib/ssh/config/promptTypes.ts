import { PromptBody, PromptType } from "../../../types";
// eslint-disable-next-line import/order
import promptly = require("promptly");

const promptTypes = new Map<PromptType, PromptBody>([
  [PromptType.Text, promptly.prompt],
  [PromptType.Password, promptly.password],
  [PromptType.Confirm, promptly.confirm]
]);

export default promptTypes;
