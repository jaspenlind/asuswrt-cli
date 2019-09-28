import { StringConvertible, StringLike } from "../types";

export { StringConvertible, StringLike };

export const convertToString = (
  value: StringLike | undefined
): string | undefined => {
  if (value === undefined) {
    return undefined;
  }

  return value.toString !== undefined ? value.toString() : (value as string);
};

export const convertToBoolean = (
  value: StringLike | undefined
): boolean | undefined => {
  const truthy = ["true", "True", "1"];
  const falsy = ["false", "False", "0"];

  const isTrue = () => truthy.find(x => x === value) !== undefined;
  const isFalse = () => falsy.find(x => x === value) !== undefined;

  if (isTrue()) {
    return true;
  }

  if (isFalse()) {
    return false;
  }

  return undefined;
};

export const convertToNumber = (
  value: StringLike | undefined
): number | undefined => {
  const valueAsNumber = Number(value);

  return Number.isNaN(valueAsNumber) ? undefined : valueAsNumber;
};

export const convert = (value: StringLike | undefined): any => {
  return (
    convertToNumber(value) || convertToBoolean(value) || convertToString(value)
  );
};
