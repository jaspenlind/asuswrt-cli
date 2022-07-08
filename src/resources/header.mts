import { read } from "../lib/helpers/file.helpers.mjs";
import { json } from "../lib/parsers/index.mjs";

export const header = async (): Promise<string> => {
  const placeholderWidth = 18;
  const { version } = json.parse("../../package.json");
  const logo = await read(import.meta.url, "logo"); // promises.readFile(`${__dirname}/logo`, "utf-8");

  return logo.replace("{{   version    }}", `v${version}`.padEnd(placeholderWidth));
};
