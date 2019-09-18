import promptly from "promptly";

export type PromptBody = (message: string, opts: promptly.Options) => any;
