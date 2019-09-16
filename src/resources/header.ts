import flexi from "flexi-path";
import { readFileSync } from "fs";
import { version } from "../../package.json";

const header = () => {
  const logo = flexi.path({ basePath: __dirname, path: "logo" });
  const content = readFileSync(logo.path, "utf8");
  return content.replace("{{   version    }}", `v${version}`.padEnd(18));
};

export default header;
