import { any, lastKey } from "./mapHelper";

export const parse = (...args: string[]): Map<string, string | undefined> => {
  const options = args.reduce<Map<string, string | undefined>>((acc, curr) => {
    const isOption = (arg: string) => arg.startsWith("-");
    if (isOption(curr)) {
      const key = curr.substring(1);
      acc.set(key, undefined);
    } else if (any(acc)) {
      const key = lastKey(acc);
      if (acc.get(key) === undefined) {
        acc.set(key, curr);
      }
    }

    return acc;
  }, new Map<string, string | undefined>());

  return options;
};

export default {
  parse
};
