import { createRequire } from "module";

const require = createRequire(import.meta.url);

// eslint-disable-next-line security/detect-non-literal-require, import/no-dynamic-require
export const parse = (path: string) => require(path);
