import { PromptBody, PromptType } from "../../../types/index.mjs";
// eslint-disable-next-line import/order
import * as promptly from "promptly";

export const promptTypes = new Map<PromptType, PromptBody>([
  [PromptType.Text, promptly.prompt],
  [PromptType.Password, promptly.password],
  [PromptType.Confirm, promptly.confirm]
]);

export default promptTypes;
