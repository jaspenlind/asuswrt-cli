import { promises } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const read = (importMetaUrl: string, fileName: string): Promise<string> => {
  const filename = fileURLToPath(importMetaUrl);
  const dir = dirname(filename);

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return promises.readFile(`${dir}/${fileName}`, "utf-8");
};
