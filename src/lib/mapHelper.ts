import { convert, StringLike } from "./stringConverter";
import { last } from "./arrayHelper";

export const any = <K, V>(map: Map<K, V>) => map.size > 0;

export const lastKey = <K, V>(map: Map<K, V>) => last(Array.from(map))[0];

export const toObject = <T, V extends StringLike | undefined>(
  map: Map<string, V>
): Partial<T> => {
  const obj: Partial<T> = {};

  map.forEach((value, key) => {
    const convertedValue = convert(value);

    Reflect.set(obj, key, convertedValue);
  });

  return obj;
};
