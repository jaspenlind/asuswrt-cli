import { ParseResult, StringComparison } from "../../types/index.mjs";

export { StringComparison };

export const parse = <T,>(
  enumType: T,
  value: string,
  comparision = StringComparison.Ordinal
): ParseResult<T[keyof T]> => {
  const result: ParseResult<T[keyof T]> = {
    hasValue: false
  };

  const matchingKey = Object.keys(enumType).find((x) =>
    comparision === StringComparison.OrdinalIgnoreCase ? x.toLowerCase() === value.toLowerCase() : x === value
  );

  if (typeof matchingKey !== "undefined") {
    result.value = enumType[matchingKey as keyof typeof enumType];
  }

  result.hasValue = typeof result.value !== "undefined";

  return result;
};
