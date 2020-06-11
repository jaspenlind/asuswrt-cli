import flexi from "flexi-path";
import { version } from "../../package.json";

const header = (): string => {
  const placeholderWidth = 18;
  const logo = flexi.path({ basePath: __dirname, path: "logo" }).read();

  return logo.replace("{{   version    }}", `v${version}`.padEnd(placeholderWidth));
};

export default header;
