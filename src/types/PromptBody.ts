import promptly from "promptly";

type PromptBody = (message: string, opts: promptly.Options) => any;

export default PromptBody;
