import flexi from "flexi-path";
import { readFileSync } from "fs";
import { version } from "../../package.json";

const header = () => {
  const placeholderWidth = 18;
  const logo = flexi.path({ basePath: __dirname, path: "logo" });
  const content = readFileSync(logo.path, "utf8");
  return content.replace(
    "{{   version    }}",
    `v${version}`.padEnd(placeholderWidth)
  );
};

export default header;
